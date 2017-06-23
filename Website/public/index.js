import { render } from 'react-dom'
import React from 'react'
import Root from 'app'

render(
  <Root />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('app', () => {
    const NewRoot = require('app').default

    render(
      <NewRoot />,
      document.getElementById('root')
    )
  })
}

