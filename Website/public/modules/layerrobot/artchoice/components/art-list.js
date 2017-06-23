import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import Art from './art-list-item'

class ArtList extends Component {

  constructor (props) {
    super(props)
    this.state = {arts: []}

    fetch('../jsontest/art.json')
    .then(response => response.json())
    .then(arts => this.setState({arts: arts}))
  }
  logIt (id, name, src) {
    console.log(id)
    console.log(name)
    console.log(src)
  }

  render () {
    return (
      <ul className='list-group'>
        {
        this.state.arts.map(({id, src, name}) => (<Art key={id} id={id} name={name} src={src} />))
        }
      </ul>)
  }
}

export default ArtList
