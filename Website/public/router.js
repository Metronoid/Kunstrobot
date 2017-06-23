// Elements
import Klaar from './modules/done/done'
import Home from './home'

// Menu components
import Team from './modules/basic-elements/team'
import Nieuws from './modules/basic-elements/nieuws'

// Components
import WachtPagina from './modules/layerrobot/waitpage'
import AdminControl from './modules/layerrobot/admin/admincontrol'
import KunstKeuze from './modules/layerrobot/artchoice/artchoice'
import LagenMaker from './modules/layerrobot/layermaker/layermaker'

const routes = [
  { path: '/',
    component: Home
  },
  { path: '/wachtpagina',
    component: WachtPagina
  },
  { path: '/klaar',
    component: Klaar
  },
  { path: '/kunstkeuze',
    component: KunstKeuze
  },
  { path: '/admincontrol',
    component: AdminControl
  },
  { path: '/lagenmaker',
    component: LagenMaker
  },
  { path: '/team',
    component: Team
  },
  { path: '/nieuws',
    component: Nieuws
  }
]

export default routes
