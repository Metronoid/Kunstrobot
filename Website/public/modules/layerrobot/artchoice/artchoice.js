import React, { Component, PropTypes } from 'react'
import Art from './components/art-list'

class LagenRobot extends Component {
  constructor (props, state) {
    super(props, state)

    this.state = {
      arts: []
    }
  }
  static propTypes = {
    match: PropTypes.object
  }

  render () {
    return (<section id='portfolio'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 text-center'>
            <h2>Wat willen jullie maken?</h2>
            <hr className='star-primary' />
          </div>
        </div>
        <div className='row'>
          <Art key={this.props.match.params.id} restaurantId={this.props.match.params.id} arts={this.state.arts} />
        </div>
      </div>
    </section>)
  }
}

export default LagenRobot
