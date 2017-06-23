import React, { Component, PropTypes } from 'react'

import { Link } from 'react-router-dom'

class Art extends Component {
  static propTypes ={
    id: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string
  }

  render () {
    return (
      <div className='col-sm-4 portfolio-item'>
        <Link className='portfolio-link' key={this.props.id} to={'/admincontrol/' + this.props.id}>
          <div className='caption'>
            <div className='caption-content'>
              <i className='glyphicon glyphicon-ok fa-3x' />
            </div>
          </div>
          <img key={this.props.id} src={'../img/kunst/' + this.props.src} className='img-responsive' alt={this.props.name} />
        </Link>
      </div>
    )
  }
}

export default Art
