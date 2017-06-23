import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'

class Nieuws extends Component {
  static oldCounter = 0

  state = {
    stepIndex: 0
  }

  handleNext = () => {
    const {stepIndex} = this.state
    if (stepIndex < 3) {
      this.setState({stepIndex: stepIndex + 1})
    }
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Volgende"
          disableTouchRipple={true}
          disableFocusRipple={true}
          backgroundColor='#e5312a'
          labelStyle={{color: '#fff'}}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Terug"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render () {
    const {stepIndex} = this.state

    return (<MuiThemeProvider>
    <section id='nieuws'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 text-center'>
            <h2 className='section-heading'>Nieuws</h2>
            <h3 className='section-subheading text-muted'>Nieuws - Kunstrobot</h3>
            <hr className='star-primary' />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 col-md-offset-3'>
            <div style={{maxWidth: 800, margin: 'auto'}}>
              <Stepper
                activeStep={stepIndex}
                linear={false}
                orientation="vertical"
              >
                <Step>
                  <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                    KunstRobot.frl online
                  </StepButton>
                  <StepContent>
                      <Card className="news-card">
                        <CardMedia
                          overlay={<CardTitle title="KunstRobot.frl online" subtitle="08-06-2017" />}
                        >
                        <img src="img/nieuws/frl-domein.png" alt="" />
                        </CardMedia>
                        <CardText>
                          De ontwikkelingen gaan op het moment snel bij het project! De webapplicatie is bijna af, dus kan ook de webapplicatie al online. 
                          Wij hebben gekozen voor een frl domein naam.
                        </CardText>
                      </Card>
                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                    Bezoek bij DutchBoxx.nl
                  </StepButton>
                  <StepContent>
                    <Card className="news-card">
                      <CardMedia
                        overlay={<CardTitle title="Bezoek bij DucthBoxx.nl" subtitle="11-5-2017" />}
                      >
                      <img src="img/nieuws/dutchboxx.jpg" alt="" />
                      </CardMedia>
                      <CardText>
                        Vandaag zijn wij langs gegaan bij onze sponsor. Wij hebben hier erg veel geleerd, technieken die bij DucthBoxx in de fabriek werden gebruikt kunnen wij veel van leren!
                        Wij hebben van DucthBoxx 1000 karton vellen gekregen voor het maken van de kunstwerken.
                      </CardText>
                    </Card>
                    {this.renderStepActions(1)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                    Frisian Design Factory
                  </StepButton>
                  <StepContent>
                    <Card className="news-card">
                      <CardMedia
                        overlay={<CardTitle title="Frisian Design Factory" subtitle="12-4-2017" />}
                      >
                      <img src="img/nieuws/designfactory.jpg" alt="" />
                      </CardMedia>
                      <CardText>
                        Na een paar weken vergaderen, uitgenodigd door de Frisian Design Factory om hier ons idee verder te ontwerpen. We zijn uit gekomen op een lazer snijder
                        die lagen op elkaar stapelt tot 1 resultaat. De bedoeling is dat we hierbij ook het publiek betrekken, wij weten nog niet precies hoe en wat voor materiaal.
                      </CardText>
                    </Card>
                    {this.renderStepActions(2)}
                  </StepContent>
                </Step>
                <Step>
                  <StepButton onTouchTap={() => this.setState({stepIndex: 3})}>
                    Start van het project
                  </StepButton>
                  <StepContent>
                    <Card className="news-card">
                      <CardMedia
                        overlay={<CardTitle title="Start van het project" subtitle="9-3-2017" />}
                      >
                      <img src="img/nieuws/uitvinderswedstrijd.png" alt="" />
                      </CardMedia>
                      <CardText>
                        De uitvinderswedstrijd gaat van start!
                      </CardText>
                    </Card>
                    {this.renderStepActions(3)}
                  </StepContent>
                </Step>
              </Stepper>
            </div>
          </div>
        </div>
      </div>
    </section>
    </MuiThemeProvider>)
  }
}

export default Nieuws
