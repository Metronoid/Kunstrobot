import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Contact extends Component {

  render () {
    return (

      <section id='contact'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <h2>Contact</h2>
              <hr className='star-primary' />
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8 col-lg-offset-2'>
              <form name='sentMessage' id='contactForm' noValidate>
                <div className='row control-group'>
                  <div className='form-group col-xs-12 floating-label-form-group controls'>
                    <label htmlFor='name'>Naam</label>
                    <input type='text' className='form-control' placeholder='Naam' id='name' required data-validation-required-message='Please enter your name.' />
                    <p className='help-block text-danger' />
                  </div>
                </div>
                <div className='row control-group'>
                  <div className='form-group col-xs-12 floating-label-form-group controls'>
                    <label htmlFor='email'>Email Adres</label>
                    <input type='email' className='form-control' placeholder='Email Adres' id='email' required data-validation-required-message='Please enter your email address.' />
                    <p className='help-block text-danger' />
                  </div>
                </div>
                <div className='row control-group'>
                  <div className='form-group col-xs-12 floating-label-form-group controls'>
                    <label htmlFor='phone'>Telefoonnummer</label>
                    <input type='tel' className='form-control' placeholder='Telefoonnummer' id='phone' required data-validation-required-message='Please enter your phone number.' />
                    <p className='help-block text-danger' />
                  </div>
                </div>
                <div className='row control-group'>
                  <div className='form-group col-xs-12 floating-label-form-group controls'>
                    <label htmlFor='bericht'>Bericht</label>
                    <textarea rows='5' className='form-control' placeholder='Bericht' id='message' required data-validation-required-message='Please enter a message.' />
                    <p className='help-block text-danger' />
                  </div>
                </div>
                <br />
                <div id='success' />
                <div className='row'>
                  <div className='form-group col-xs-12'>
                    <button type='submit' className='btn btn-success btn-lg'>Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    )
  }
}

export default Contact
