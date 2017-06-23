import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Menu extends Component {

  render () {
    return (
      <nav id='mainNav' className='navbar navbar-default navbar-fixed-top navbar-custom'>
        <div className='container'>
          <div className='navbar-header page-scroll'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
              <span className='sr-only'>Toggle navigation</span> Menu <i className='fa fa-bars' />
            </button>
            <Link className='navbar-brand web-name' to='/'><b className="main-name">Kunst Robot</b><img src="img/icon/frl.png" className="frl-icon" /></Link>
          </div>

          <div className='collapse navbar-collapse' id=''>
            <ul className='nav navbar-nav navbar-right'>
              <li className='hidden' />
              <li className='page-scroll'>
                <Link to='/team'>Team</Link>
              </li>
              <li className='page-scroll'>
                <Link to='/nieuws'>Nieuws</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Menu
