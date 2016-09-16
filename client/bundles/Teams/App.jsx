import React from 'react'
import ReactOnRails from 'react-on-rails'
import Teams from '../../containers/Teams'
import Players from '../../containers/Players'

/* todo: Fix up how containers are registered, and import them in from lib */
const TeamsApp = (props) => ( <Teams {...props} /> )
const PlayersApp = (props) => ( <Players {...props} /> )

ReactOnRails.register({ TeamsApp, PlayersApp })
