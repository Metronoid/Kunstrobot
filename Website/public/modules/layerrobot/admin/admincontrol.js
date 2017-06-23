import React, { Component, PropTypes } from 'react'
import MakerList from './components/maker-list'

class WachtPagina extends Component {
  static contextTypes ={
    history: PropTypes.object
  }
  static PropTypes ={
    realCode: PropTypes.number,
    adminCode: PropTypes.number,
    artID: PropTypes.number
  }
  constructor (props) {
    super(props)
    this.state = {
      robot: [],
      artID: 0,
      arts: []
    }
  }
  static propTypes = {
    match: PropTypes.object
  }

  redirect () {
    this.context.history.push('/klaar/' + this.props.match.params.id)
  }

  render () {
    return (<section id='portfolio'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 text-center'>
            <h2>Admin Page</h2>
            <hr className='star-primary' />
            <MakerList key={this.props.match.params.id} restaurantId={this.props.match.params.id} arts={this.state.arts} />
          </div>
        </div>
        <center>
          {/* Link hieronder moet API link worden */}
          <a href='' width='200px' target='_blank' className='btn btn-primary btn-lg submit-code center' onClick={() => this.redirect()}>Stop alle kunstenaars</a>
        </center>
        <p />

      </div>

    </section>)
  }
}

export default WachtPagina
