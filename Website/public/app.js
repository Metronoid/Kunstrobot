require('./vendor/bootstrap/js/bootstrap.js');
//require('./vendor/react-bootstrap/react-bootstrap.js');

import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import './vendor/bootstrap/css/bootstrap.css'
import './css/freelancer.css'
import './css/own.css'
import './css/team.css'
import './css/draw.css'

import Menu from './modules/basic-elements/menu'
import Footer from './modules/basic-elements/footer'

import routes from './router.js'

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(process.env.SOCKET_URL)

// Display:
class App extends Component {
  constructor (props) {
    super(props);
    socket.on('push', (layer,count) => {
        socket.layer = layer;
        socket.layer_done = layer.done;
        socket.layer_ID = layer.id;
    })
  }

  render () {
    return (<div>
      <SocketProvider socket={socket} history={history}>
        <BrowserRouter>
          <div>
            <Menu />
            {routes.map((route, index) => (
              <Route exact {...route} key={index}/>
            ))}
            <Footer />
          </div>
        </BrowserRouter>
      </SocketProvider>
    </div>
    )
  }
}

export default App

