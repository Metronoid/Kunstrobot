import React, { Component, PropTypes } from 'react'
import { socketConnect } from 'socket.io-react'

class Art extends Component {
  static propTypes ={
    id: PropTypes.number,
    artid: PropTypes.number,
    src: PropTypes.string,
    name: PropTypes.string,
    robotid: PropTypes.number,
    layers: PropTypes.number
  }

  constructor (props) {
    super(props)
  }

  message(){
    if(this.props.socket.layer != undefined){
      return 'U bent een Kunstenaar'
    }
    return 'U hebt niks gedaan'
  }

  render () {
    return (<div>
      <div className='col-sm-6 portfolio-item'>
        <img key={this.props.id} src={this.props.src} className='img-responsive half-width img-center' alt={this.props.name} />
      </div>
      <div className='col-sm-6 portfolio-item'>
        <h3>Kartonnen {this.props.name}</h3>
        <b>Hoeveelheid lagen: </b>{this.props.layers} <br />
        <b>Laag getekend door jou: </b>{this.props.socket.layer_ID}<br />
        <br />
        Gefeliciteerd! {this.message()}<br /><br />
        Grote dank aan onze sponsor <b><a href='https://www.dutchboxx.nl/' alt='dutchboxx'>dutchboxx.nl</a></b>
      </div>
    </div>
    )
  }
}

export default socketConnect(Art)
