import React, { Component } from 'react'


const data = [
  { name: 'Anouk de Jong',
    role: 'Technische Bedrijfskunde & Project Leiding',
    title: 'Wie ben ik?',
    description: 'Be yourself because everyone else is already taken',
    img: '../img/components/team/Anouk.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: 'mailto:jong1521@student.nhl.nl'
  },
  { name: 'Wander van der Wal',
    role: 'Informatica & Project Leiding',
    title: 'Meow!',
    description: 'Wil je mijn vriendje zijn?',
    img: '../img/components/team/Wander.jpg',
    facebook: '',
    linkedin: 'https://www.linkedin.com/in/wander-the-friendly-salamander',
    instagram: '',
    mail: 'mailto:wal1508@student.nhl.nl'
  },
  { name: 'Dennis Stiekema',
    role: 'Informatica',
    title: '48616c6c6f',
    description: 'Eat, Sleep, Code, Repeat',
    img: '../img/components/team/Dennis.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: 'mailto:stie1300@student.nhl.nl'
  },
  { name: 'Albert van Houten',
    role: 'Informatica',
    title: 'Wie ben ik?',
    description: 'Ik ben een gemotiveerde student die zich helemaal inzet voor de groep',
    img: '../img/components/team/Albert.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: ''
  },
  { name: 'Jan Allersma',
    role: 'Informatica',
    title: 'Ik eet hier.',
    description: 'Mijn moeder zei dat ik mee mocht doen.',
    img: '../img/components/team/Jan.jpg',
    facebook: '',
    linkedin: '',
    instagram: 'https://www.instagram.com/de_opperswekker/',
    mail: 'mailto:rotzooi@allersma.be'
  },
  { name: 'Jorben Saaltink',
    role: 'Informatica',
    title: 'Website laten maken',
    description: <a href='http://www.jorbensaaltink.com/webdevelopment'>Click dan hier</a>,
    img: '../img/components/team/Jorben.jpg',
    facebook: 'https://www.facebook.com/jorben.saaltink',
    linkedin: 'https://www.linkedin.com/in/jorben-saaltink-432067106/',
    instagram: 'https://www.instagram.com/jorbensaaltink/',
    mail: 'mailto:info@jorbensaaltink.com'
  },
  { name: 'Geart van der Ploeg',
    role: 'Elektrotechniek',
    title: 'Ghallo',
    description: 'Wat is dit?',
    img: '../img/components/team/Geart.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: 'mailto:geartploeg@gmail.com'
  },
  { name: 'Rudy van den Bosch',
    role: 'Elektrotechniek',
    title: '404',
    description: 'Not Found!',
    img: '../img/components/team/Rudy.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: 'mailto:bosc1500@student.nhl.nl'
  },
  { name: 'Margreet Ter Schure',
    role: 'Elektrotechniek',
    title: 'Het klopt',
    description: 'Ik doe aan Waterpolo',
    img: '../img/components/team/Margreet.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: ''
  },
  { name: 'Harmen Wiersma',
    role: 'Elektrotechniek',
    title: 'Goeie',
    description: 'Alles is leuk maar Informatica begrijp ik niet',
    img: '../img/components/team/Harmen.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: 'mailto:wier1414@student.nhl.nl'
  },
  { name: 'Harrie Albert Herbig',
    role: 'Elektrotechniek',
    title: 'Halliebieharka',
    description: 'Een toets kan je overdoen, een feestje niet',
    img: '../img/components/team/Harry.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: ''
  },
  { name: 'Martijn van der Wal',
    role: 'Elektrotechniek',
    title: 'Verrukt',
    description: 'Ik ben geen familie van Wander',
    img: '../img/components/team/Martijn.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: ''
  },
  { name: 'Henk de Jong',
      role: 'Elektrotechniek',
      title: 'Mhmmm',
      description: 'Ik ben geen familie van Anouk',
      img: '../img/components/team/Henk.jpg',
      facebook: '',
      linkedin: '',
      instagram: '',
      mail: 'mailto:veen1514@student.nhl.nl'
  },
  { name: 'Adriaan-Johannes Otte',
    role: 'Werktuigbouwkunde',
    title: 'Visie',
    description: 'Veni, Vidi, Vici',
    img: '../img/components/team/Adriaan.jpg',
    facebook: 'https://www.facebook.com/adriaan.otte',
    linkedin: 'https://www.linkedin.com/in/adriaan-otte-84b904135/',
    instagram: 'https://www.instagram.com/cbtadriaan/',
    mail: 'mailto:adriian.j.otte@gmail.com'
  },
  { name: 'Marie van der Veen',
    role: 'Werktuigbouwkunde & Planning',
    title: 'Machtigggg!',
    description: 'Zeer enthousiast',
    img: '../img/components/team/Marie.jpg',
    facebook: 'https://www.facebook.com/marie.vanderveen.56',
    linkedin: 'https://www.linkedin.com/in/marie-van-der-veen-676897120',
    instagram: '',
    mail: 'mailto:veen1514@student.nhl.nl'
  },
  { name: 'Stacy Zillen',
    role: 'Docent Beeldende Kunst en Vormgeving',
    title: 'Wie ben ik?',
    description: 'Gezellig en creatief',
    img: '../img/components/team/Stacy.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: ''
  },
  { name: 'Machteld Schoenmaker',
    role: 'Docent Beeldende Kunst en Vormgeving',
    title: 'Facebook!!',
    description: 'Ik maak leuke patroontjes',
    img: '../img/components/team/Machteld.jpg',
    facebook: '',
    linkedin: '',
    instagram: '',
    mail: ''
  },
  { name: 'Jos Foppele',
      role: 'Docent Informatica & Project Tutor',
      title: 'Star Wars',
      description: 'Je kan me omkopen met Whisky',
      img: '../img/components/team/Jos.jpg',
      facebook: '',
      linkedin: 'https://www.linkedin.com/in/jos-foppele-33757a106',
      instagram: '',
      mail: ''
  }
]

class Team extends Component {
  static oldCounter = 0

  render () {
    return (<section id='team'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 text-center'>
            <h2 className='section-heading'>Team</h2>
            <h3 className='section-subheading text-muted'>Team - Kunstrobot</h3>
            <hr className='star-primary' />
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12 text-center'>
            {data.map((person, index) => (
              <div className='col-md-4 col-sm-4' key={index}>
                <div className='team-member'>
                  <div className='team-img'>
                    <img src={person.img} alt='team member' className='img-responsive' />
                  </div>
                  <div className='team-hover'>
                    <div className='desk'>
                      <h4>{person.title}</h4>
                      <p>{person.description}</p>
                    </div>
                    <div className='s-link'>
                      {(() => {
                        if (person.facebook !== '') {
                          return <a href={person.facebook}><i className='fa fa-facebook' /></a>
                        }
                      })()}
                      {(() => {
                        if (person.linkedin !== '') {
                          return <a href={person.linkedin}><i className='fa fa-linkedin' /></a>
                        }
                      })()}
                      {(() => {
                        if (person.instagram !== '') {
                          return <a href={person.instagram}><i className='fa fa-instagram' /></a>
                        }
                      })()}
                      {(() => {
                        if (person.mail !== '') {
                          return <a href={person.mail}><i className='fa fa-envelope-o' /></a>
                        }
                      })()}
                    </div>
                  </div>
                </div>
                <div className='team-title'>
                  <h5>{person.name}</h5>
                  <span>{person.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>)
  }
}

export default Team
