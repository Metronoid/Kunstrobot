import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { socketConnect } from 'socket.io-react';


class WachtPagina extends Component {

  constructor(props) {
      super(props);
      this.props.socket.emit('waiting');
      props.socket.on('push', (laag) => {
          if(laag != undefined) props.history.push('/lagenmaker')
      })
  }

  render () {
    return (<section id='portfolio'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 text-center'>
            <center><img className='img-responsive load-pic' src='img/loading/cube.gif' alt='' /></center>
            <h2>U zit in een wachtrij..</h2>
            <h5>we hebben geen wacht muziek</h5>
            <hr className='star-primary' />
          </div>
        </div>
      </div>
    </section>)
  }
}

export default socketConnect(WachtPagina)
