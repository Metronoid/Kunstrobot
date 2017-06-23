import React, { Component, PropTypes } from 'react'

class Art extends Component {
  static propTypes ={
    id: PropTypes.number,
    artid: PropTypes.number,
    src: PropTypes.string,
    name: PropTypes.string,
    robotid: PropTypes.number,
    groupcount: PropTypes.number,
    layersmade: PropTypes.number,
    layers: PropTypes.number
  }

  render () {
    return (
      <div className='col-sm-12 portfolio-item'>
        <div className='icon-div inline-block'>
          <img className='maker-icon' src={this.props.src} alt={this.props.name} />
        </div>
        <div className='icon-text inline-block'>
          <b> Kunstwerk: </b> {this.props.name} <br />
        </div>
        <div className='icon-div inline-block'>
          <img className='layer-icon' src='../img/icon/layers.png' alt='layers' />
        </div>
        <div className='icon-text inline-block'>
          <b> Totaal lagen: </b>{this.props.layers} <br />
        </div>
        <div className='icon-div inline-block'>
          <img className='pencil-icon' src='../img/icon/pencil.png' alt='layers' />
        </div>
        <div className='icon-text inline-block'>
          <b> Lagen tekenen: </b>{this.props.layersmade}
        </div>
      </div>
    )
  }
}

export default Art
