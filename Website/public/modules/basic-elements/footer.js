import React, { Component } from 'react'

class Footer extends Component {

  render () {
    return (<div>
      <footer className='text-center'>
        <div className='footer-above'>
          <div className='container'>
            <div className='row'>
              <div className='footer-col col-md-4'>
                <h3>Locatie</h3>
                <p>Rengerslaan 10
                  <br />8917 DD, Leeuwarden</p>
              </div>
              <div className='footer-col col-md-4'>
                <h3>Social Media</h3>
                <ul className='list-inline'>
                  <li>
                    <a href='https://www.facebook.com/NHL-Uitvinderswedstrijd-209132772897971/' className='btn-social btn-outline'><span className='sr-only'>Facebook</span><i className='fa fa-fw fa-facebook' /></a>
                  </li>
                  {/*
                  <li>
                       <a href='#' className='btn-social btn-outline'><span className='sr-only'>Google Plus</span><i className='fa fa-fw fa-google-plus' /></a>
                  </li>
                  <li>
                       <a href='#' className='btn-social btn-outline'><span className='sr-only'>YouTube</span><i className='fa fa-fw fa-youtube' /></a>
                  </li>
                  */}
                </ul>
              </div>
              <div className='footer-col col-md-4'>
                <h3>In Het Kort</h3>
                <p>De Kunst Robot is gemaakt voor de uitvinderswedstrijd georganiseerd door <a href='https://www.icdrachten.nl/'>Innovatie Cluster Drachten</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-below'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                        Copyright &copy; Team NHL | Kunst Robot 2017
                    </div>
            </div>
          </div>
        </div>
      </footer>
    </div>)
  }
}

export default Footer
