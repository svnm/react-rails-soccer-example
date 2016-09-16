import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'

import Player from '../components/Player'
import PlayerNew from '../components/PlayerNew'

export default class Players extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = { players: props.data }
  }

  addPlayer(player) {
    let players = update(this.state.players, {$push: [player]})
    this.setState({ players: players })
  }

  deletePlayer(player) {
    let index = this.state.players.indexOf(player)
    let players = update(this.state.players, {$splice: [[index, 1]]})
    this.setState({ players: players })
  }

  handleEditPlayers(player) {
    let index = this.state.players.indexOf(player)
    let players = update(this.state.players, {$splice: [[index, 1, player]]})
    this.setState({ players: players} )
  }

  handleEditPlayer(player, data) {
    var index = this.state.players.indexOf(player)
    var players = update(this.state.players, {$splice: [[index, 1, data]]})
    this.setState({ players: players} )
  }

  render() {
    var players = this.state.players.map((p, i) => {
      return <Player key={p.id} player={p}
                   handleDeletePlayer={player => this.deletePlayer(player)}
                   handleEditPlayer={(player, data) => this.handleEditPlayer(player, data)} />
    })

    return (
      <div className='players'>
        <h2> Players </h2>
        <PlayerNew handleNewPlayer={player => this.addPlayer(player)}/>
        <hr />
        {players}
      </div>
    )
  }
}
