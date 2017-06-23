import React, { Component, PropTypes } from 'react'
import { socketConnect } from 'socket.io-react';
import { Link } from 'react-router-dom'
import ArtList from './components/done-list'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

class Done extends Component {
  constructor (props, state) {
    super(props, state)

    this.state = {
      arts: []
    }
  }
  static propTypes = {
    match: PropTypes.object
  }

  backKnop (event) {
     this.props.socket.emit('waiting');
     this.props.history.push('/wachtpagina')
  }

  render () {
    return (<MuiThemeProvider>
    <div>
      <section id='portfolio'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <h1 className='name'>Het kunstwerk wordt gemaakt! {this.state.name}</h1>
              <hr className='star-primary' />
            </div>
          </div>
          <div className='row'>
            <ArtList key={this.props.match.params.id} artid={this.props.match.params.id} arts={this.state.arts} />
            <div className='make-more-pos'>
                <RaisedButton label="Maak nog een laag" labelStyle={{color: '#fff'}} backgroundColor='#2c3e50' onTouchTap={() => this.backKnop()}/>
            </div>
            <div className='col-sm-12 center'>
              <a href='https://www.dutchboxx.nl/'>
                <img src='../img/sponsor/dutchboxx.jpg' className='img-responsive' alt='Cabin' />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ MuiThemeProvider>)
  }
}

export default socketConnect(Done)
