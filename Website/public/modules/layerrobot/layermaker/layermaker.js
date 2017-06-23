import React, { Component, PropTypes} from 'react'
import { socketConnect } from 'socket.io-react';
// import fetch from 'isomorphic-fetch'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

// Icons for cardboard editor
const pieceIcon = <FontIcon className='material-icons'>extension</FontIcon>
const layerIcon = <FontIcon className='material-icons'>layers</FontIcon>
const peopleIcon = <FontIcon className='material-icons'>people</FontIcon>

const undoIcon = <FontIcon className='material-icons'>undo</FontIcon>
const approveIcon = <FontIcon className='material-icons'>assignment_turned_in</FontIcon>
const sendIcon = <FontIcon className='material-icons'>send</FontIcon>


  class LagenMaker extends Component {
    constructor (props) {
      super(props)
      this.index = 0
      this.d3GeomContourDx = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN]
      this.d3GeomContourDy = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN]

        this.state = {
            users: 0,
            layers: 50,
            open: true,
            blueprintsize: this.props.socket.layer_ID * 2
        }


    }

    componentWillMount(){
        if(this.readCookie("popupdone")){
          this.setState({open: false})
        }
        if(this.props.socket.layer == undefined) {
            this.props.history.push('/');
        }
        this.props.socket.on('pushOut', (layer) => {
            if(layer == this.props.socket.layer.id && !this.props.socket.layer.done) this.redirect()
        })
        this.props.socket.on('users', (length) => {
            this.state.users = length;
            this.setState((state, props) => {
                return {users: state.users, socket: props.socket, layers: state.layers};
            });
        })
        this.props.socket.on('layers', (layers) => {
            this.state.layers = layers;
            this.setState((state, props) => {
                return {users: props.users, socket: props.socket, layers: state.layers};
            });
        })
        this.setBluePrint(this.state.blueprintsize)
    }

    static propTypes = {
      match: PropTypes.object
    };

    checkCutting (event) {
        this.findCut();
    }

      redirect (event) {
          // Redirect user.
          this.findCut();
          this.props.socket.layer_done = true;
          this.props.socket.emit('coordinates',this.coordinates,this.props.socket.layer);
          this.props.history.push('/klaar')
      }


      reset (event) {
        this.props.history.push('/wachtpagina')
    }

    componentDidMount () {
      this.canvas = document.getElementById('drawMap')
      this.drawContext = this.canvas.getContext('2d')
        this.outerCanvas = document.getElementById('outline')
        this.outline = this.outerCanvas.getContext('2d')
      this.initDrawMap(this.coordinates)
    }

    findCut () {
      var imgData = this.drawContext.getImageData(0, 0, this.canvas.width, this.canvas.height)
      this.coordinates = this.contour(imgData, this.defineNonTransparent)
      this.drawContour(imgData, this.coordinates)
    }

    drawContour (imgData, contours) {
      this.outline.strokeStyle = 'red';
      this.outline.lineWidth = 5;
      this.outline.beginPath();
      for (var i = 0; i < contours.length; i++) {
        this.outline.lineTo(contours[i][0], contours[i][1])
      }
      this.outline.closePath();
      this.outline.stroke();
    }

    contour (imgData, grid, start) {
      var s = start || this.d3GeomContourStart(imgData, grid) // starting point
      var c = [];   // contour polygon
      var x = s[0]; // current x position
      var y = s[1]; // current y position
      var dx = 0;    // next x direction
      var dy = 0;    // next y direction
      var pdx = NaN; // previous x direction
      var pdy = NaN; // previous y direction
      var i = 0

      do {
      // determine marching squares index
        i = 0
        if (grid(imgData, x - 1, y - 1)) i += 1
        if (grid(imgData, x, y - 1)) i += 2
        if (grid(imgData, x - 1, y)) i += 4
        if (grid(imgData, x, y)) i += 8

      // determine next direction
        if (i === 6) {
          dx = pdy === -1 ? -1 : 1
          dy = 0
        } else if (i === 9) {
          dx = 0
          dy = pdx === 1 ? -1 : 1
        } else {
          dx = this.d3GeomContourDx[i]
          dy = this.d3GeomContourDy[i]
        }

      // update contour polygon
        if (dx !== pdx && dy !== pdy) {
          c.push([x, y])
          pdx = dx
          pdy = dy
        }

        x += dx
        y += dy
      } while (s[0] !== x || s[1] !== y)

      return c
    }

    d3GeomContourStart (imgData, grid) {
      var x = this.canvas.width / 2
      var y = this.canvas.height / 2
      while (y < this.canvas.height && grid(imgData, x, y)) {
        if (!grid(imgData, x, y + 1)) {
          return [x, y + 1]
        }
        y++
      }

      y = this.canvas.height / 2
      while (y > 0 && grid(imgData, x, y)) {
        if (!grid(imgData, x, y - 1)) {
          return [x, y - 1]
        }
        y--
      }

      y = this.canvas.height / 2
      while (x < this.canvas.width && grid(imgData, x, y)) {
        if (!grid(imgData, x + 1, y)) {
          return [x + 1, y]
        }
        x++
      }

      x = this.canvas.width / 2
      while (x > 0 && grid(imgData, x, y)) {
        if (!grid(imgData, x - 1, y)) {
          return [x - 1, y]
        }
        x--
      }
    }

    defineNonTransparent (imgData, x, y) {
      return (imgData.data[(y * imgData.width + x) * 4 + 3] > 20)
    }

    initDrawMap (coordinates) {
      var canvas = this.canvas
      var drawContext = this.drawContext

      var mouse = { x: 0, y: 0 }
      var lastMouse = { x: 0, y: 0 }
      var beginMousePath = { x: 0, y: 0 }
      var drawing = false
      drawCircle()

      canvas.addEventListener('mousemove', function (e) {
        lastMouse = mouse
        mouse = getCoordinatesMouse(e)
      }, false)

      canvas.addEventListener('touchmove', function (e) {
        e.preventDefault()
        lastMouse = mouse
        mouse = getCoordinatesTouch(e)
      }, false)

      canvas.addEventListener('mousedown', function (e) {
        drawing = true
        beginMousePath = mouse
        drawContext.beginPath()
        //drawContext.moveTo(lastMouse.x, lastMouse.y)
        canvas.addEventListener('mousemove', Paint, false)
      }, false)

      canvas.addEventListener('touchstart', function (e) {
        mouse = getCoordinatesTouch(e)
        drawing = true
        beginMousePath = mouse
        drawContext.beginPath()
        //context.moveTo(lastMouse.x, lastMouse.y)
        canvas.addEventListener('touchmove', Paint, false)
      }, false)

      canvas.addEventListener('mouseup', function (e) {
        drawing = false
        canvas.removeEventListener('mousemove', Paint, false)
        drawContext.fillStyle = 'blue'
        drawContext.fill()
        drawContext.closePath()
        drawContext.stroke()
        drawCircle()
      }, false)

      canvas.addEventListener('touchend', function (e) {
        drawing = false
        canvas.removeEventListener('touchmove', Paint, false)
        lastMouse = beginMousePath
        drawContext.fillStyle = 'blue'
        drawContext.fill()
        drawContext.closePath()
        drawContext.stroke()
        drawCircle()
      }, false)

      canvas.addEventListener('mouseleave', function (e) {
        if (drawing) {
          lastMouse = beginMousePath
          Paint()
        }
        drawing = false
        canvas.removeEventListener('mousemove', Paint, false)
      }, false)

      canvas.addEventListener('touchleave', function (e) {
        if (drawing) {
          lastMouse = beginMousePath
          Paint()
        }
        drawing = false
        canvas.removeEventListener('touchmove', Paint, false)
      }, false)

      drawContext.lineWidth = 1
      drawContext.lineJoin = 'round'
      drawContext.lineCap = 'round'
      drawContext.strokeStyle = 'blue'

      function Paint () {
        if (pointInCircle(mouse.x, mouse.y, canvas.width / 2, canvas.height / 2, 25)) return
        drawContext.lineTo(mouse.x, mouse.y)
        drawContext.stroke()
      }

      function getCoordinatesMouse (e) {
        var rect = canvas.getBoundingClientRect()
        var scaleX = canvas.width / rect.width
        var scaleY = canvas.height / rect.height
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        }
      }

      function getCoordinatesTouch (e) {
        var rect = canvas.getBoundingClientRect()
        var scaleX = canvas.width / rect.width
        var scaleY = canvas.height / rect.height
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY
        }
      }

      function drawCircle () {
        drawContext.beginPath()
        drawContext.arc(canvas.width / 2, canvas.height / 2, 25, 0, 2 * Math.PI, false)
        drawContext.fillStyle = 'grey'
        drawContext.fill()
        drawContext.closePath()

        drawContext.beginPath()
        drawContext.arc(canvas.width / 2 + 10, canvas.height / 2, 5, 0, 2 * Math.PI, false)
        drawContext.arc(canvas.width / 2 - 10, canvas.height / 2, 5, 0, 2 * Math.PI, false)
        drawContext.fillStyle = 'black'
        drawContext.fill()
        drawContext.closePath()
      }

      function pointInCircle (x, y, cx, cy, radius) {
        var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy)
        return distancesquared <= radius * radius
      }
    }

    handleClose = () => {
      var date = new Date()
      date.setTime(date.getTime()+(3000*1000))  // 50 min
      var expires = "; expires="+date.toGMTString()
      document.cookie = "popupdone=true"+expires+"; path=/"
      
      this.setState({open: false})
    }

    readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    setBluePrint(size)
    {
      if (size <= 50){
        var calc = 50 + size
      }
      else {
        var calc = 150 - size
      }
      this.setState({blueprintsize: calc})
    }

    render () {
      const actions = [
        <div className='button-pos-dialog inline-block'>
          <RaisedButton
            label="Ik heb niks gelezen komt goed"
            labelStyle={{color: '#fff'}} backgroundColor='#e5312a'
            onTouchTap={this.handleClose}
          />
        </div>,
        <div className='button-pos-dialog inline-block'>
          <RaisedButton
            label="Alles gelezen ik snap het"
            labelStyle={{color: '#fff'}} backgroundColor='#6ac259'
            onTouchTap={this.handleClose}
          />
        </div>,
      ]
      return (<MuiThemeProvider>
      <section id='portfolio' className='section-fix'>
        <Dialog
          title="Welkom op de teken pagina"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        Voor dat u begint is het handig om het volgende te weten: <p />
        • <b>Bovenin</b> staat informatie over het kunstwerk.<br />
        • <b>Onderin</b> staan belangrijke knoppen. <br />
        • <b>De grijze cirkel</b> is de basis van de laag, teken hier omheen.<br />
        • <b>De 2 zwarte stippen</b> zijn gaten in het vlak, hierdoor word elke laag opgerijgt.<br />
        </Dialog>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <h2>Vlakken Tekenen</h2>
              <hr className='star-primary' />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-md-offset-3 menu-padding'>
              <Paper zDepth={1}>
                <BottomNavigation>
                    <BottomNavigationItem
                        label={"Deelnemers: " + this.state.users}
                        icon={peopleIcon}
                        disabled
                    />
                    <BottomNavigationItem
                        label={"Laag: " + this.props.socket.layer_ID}
                        icon={pieceIcon}
                        disabled
                    />
                    <BottomNavigationItem
                        label={"Totaal lagen: "+ this.state.layers}
                        icon={layerIcon}
                        disabled
                    />
                </BottomNavigation>
              </Paper>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-md-offset-3 img-responsive' id='drawDiv'>
              <canvas id='outline' />
              <canvas id='drawMap' />
              <div>
                <img src='/img/blauwdruk/hart/heart.png' class="blauwdruk-pos img-responsive" style={{width: this.state.blueprintsize + "%"}}/>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-md-offset-3 menu-padding'>
              <Paper zDepth={1}>
                <BottomNavigation>
                    <BottomNavigationItem
                        label="Opnieuw"
                        icon={undoIcon}
                        onTouchTap={() => this.reset()}
                    />
                    <BottomNavigationItem
                        label="Bekijk resultaat"
                        icon={approveIcon}
                        onTouchTap={() => this.checkCutting()}
                    />
                    <BottomNavigationItem
                        label="Verstuur laag"
                        icon={sendIcon}
                        onTouchTap={() => this.redirect()}
                    />
                </BottomNavigation>
              </Paper>
              {/*
              <center className='button-box'>
                <div className="button-pos inline-block"> <RaisedButton label="Verstuur mijn laag" secondary onTouchTap={() => this.checkCutting()} /></div>
                <div className="button-pos inline-block"> <RaisedButton label="Begin opnieuw" primary onTouchTap={() => this.reset()} /></div>
              </center>
              */}
              <br /><br /><br />
            </div>
          </div>
        </div>
      </section>
      </ MuiThemeProvider>)
    }
  }

  export default socketConnect(LagenMaker)
