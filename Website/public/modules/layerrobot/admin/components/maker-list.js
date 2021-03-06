import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import Art from './maker-list-item'

class ArtList extends Component {

  constructor (props) {
    super(props)
    this.state = {artinfo: []}

    fetch('../jsontest/persons.json')
    .then(response => response.json())
    .then(artinfo => this.setState({artinfo: artinfo}))
  }

  render () {
    return (
      <ul className='list-group'>
        {
        this.state.artinfo.map(({id, artid, src, name, robotid, groupcount, layersmade, layers}) =>
        (<Art key={id} id={id} artid={artid} src={src} name={name} robotid={robotid} groupcount={groupcount} layersmade={layersmade} layers={layers} />))
        }
      </ul>)
  }
}

export default ArtList
