/**
 * Created by wander on 5/22/17.
 */
import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { socketConnect } from 'socket.io-react';
import { browserHistory } from 'react-router'

/* Material ui */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'
import {Card, CardActions, CardMedia,CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const style = 
{
   backgroundColor: ''
}

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-57433745-7', 'auto');
        ga('send', 'pageview')
    }


    checkPage (event) {
        this.props.history.push('/wachtpagina')
    }

    render () {
        return (<MuiThemeProvider>
            <div>
                {/*Als je een Video op de achtergrond wil kan je deze code gebruiken*/}
            {/*<video className="background-video" autoPlay loop muted>*/}
                {/*<source src="/video/kunstrobot.mp4" type="video/mp4" />*/}
            {/*</video>*/}
            <section id='portfolio'>
                <div className='container'>
                    <div className='row'>
                            <div className='col-sm-6 col-sm-offset-3'>
                                 <Card>
                                    <CardMedia>
                                    <img src="/img/main/bart.jpg" alt="" />
                                    </CardMedia>
                                     <CardTitle title="Welkom bij βart" subtitle="De kunstrobot van het noorden" />
                                    <CardText>
                                    Welkom op de website van Bart. Via deze website kunt u informatie ophalen & mee werken aan het kunstwerk 
                                    dat bart aan het maken is. Via de knop hieronder kunt u uw eigen karton laag tekenen, hierdoor bijdragen 
                                    aan het nieuwe kunstwerk!
                                    </CardText>
                                    <center>
                                    <a data-toggle='modal' onClick={() => this.checkPage()}><RaisedButton label="Maak een kunstwerk" labelStyle={{color: '#fff'}} backgroundColor='#e5312a' /></a>
                                    </center>
                                    <br />
                                </Card>
                            </div>
                    </div>
                </div>
            </section>
        </div>
        </ MuiThemeProvider>)
    }
}

export default socketConnect(Home)
