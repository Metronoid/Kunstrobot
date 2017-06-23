require('babel-register')({
  presets: ['es2015', 'react']
})

// Backend Settings
const layers = 50;
const pushOutTime = 300000;
// Backend Initializations
var waitingRow = [];
var freeLayers = [];
var doneLayers = [];

// Express Settings
const express = require('express')
const app = express()
const path = require('path')
const port = 80
var DIST_DIR = path.join(__dirname, './public')

// Webpack Settings
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

var compiler = webpack(config())
const middleware = webpackDevMiddleware(compiler, { noInfo: true, publicPath: config().output.publicPath })
app.use(middleware)
app.use(webpackHotMiddleware(compiler))

// React Settings
import React from 'react'
import routes from './public/router.js'
import { matchPath, StaticRouter, Route } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

// Socket Settings
const server = require('socket.io')
var http = require('http').Server(app)
const io = server(http)

app.set('view engine', 'ejs')

app.use(express.static(DIST_DIR))

var JSON_Page = {}

app.get('/json', function(req, res, next) {
    let jsonLayers = [];
    jsonLayers.push.apply(jsonLayers,freeLayers);
    jsonLayers.push.apply(jsonLayers,doneLayers);
    for (let i = 0; i < waitingRow.length; i++) {
        jsonLayers.push(waitingRow[i].layer)
    }
    console.log(jsonLayers)
  return res.send(JSON.stringify(jsonLayers));
});

app.get('/json/:id', function(req, res, next) {
  var id = req.params.id;
  if(JSON_Page[id] != undefined) return res.send(JSON.stringify(JSON_Page[id]));
  return res.send('\"[]\"');
});

// Use this for parsing urls.
app.get('*', (req, res, next) => {
  routes.some(route => {
    const match = matchPath(req.url, route)
    if (match) {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
      res.end()
    }
    return match
  })
})

for(let i = layers; i > 0; i--){
  freeLayers.push({id: i, done: false})
}

// Socket Code.
// Whenever someone connects this gets executed.
io.on('connection', function (socket) {
    socket.emit('layers',layers);
  // TODO: Check if the Laser can be used before pushing.
  socket.on('waiting', function () {
      var knownLayer = waitingRow.find(findSocket.bind(this, socket.id));
      if(knownLayer == undefined) {
        let l = freeLayers.pop();
        if (l == undefined) {
            console.log('All layers are used.')
        } else {
            waitingRow.push({s: socket.id, layer: l});
            setTimeout(pushOut, pushOutTime, socket, l);
            socket.emit('push',l);
            io.emit('users', waitingRow.length);
            console.log(waitingRow[waitingRow.length - 1].layer)
        }
      }else{
        socket.emit('push', knownLayer.layer);
          io.emit('users', waitingRow.length);
      }
  });

  socket.on('coordinates', function(data,layer){
    // Make the blueprint data close in on itself.
      if(data != undefined) {
          data.push(data[0])
          JSON_Page[layer.id] = JSON.stringify(data)
          let s = waitingRow.find(findSocket.bind(this, socket.id))
          if (s != undefined) {
              s.layer.done = true;
              removeLayer(s)
          }
      }else{
          console.log('Data is undefined');
      }
  });

  // Whenever someone disconnects.
  socket.on('disconnect', function () {
      let s = waitingRow.find(findSocket.bind(this, socket.id))
      if(s != undefined) {
          removeLayer(s)
          io.emit('users', waitingRow.length);
      }
  });
});

function pushOut(socket, l){
    socket.emit('pushOut', l.id);
}

function removeLayer(s) {
  if(s != undefined){
    if(!s.layer.done) {
        freeLayers.push(s.layer)
    }else{
        doneLayers.push(s.layer)
    }
    waitingRow.splice(waitingRow.indexOf(s), 1);
  }
}

function findSocket(id,item) {
    return id === item.s
}

http.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==>  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})
