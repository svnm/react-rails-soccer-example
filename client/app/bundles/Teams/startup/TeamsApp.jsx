import React from 'react'
import ReactOnRails from 'react-on-rails'
import Teams from '../containers/Teams'

const TeamsApp = (props) => (
  <Teams {...props} />
)

ReactOnRails.register({ TeamsApp })
