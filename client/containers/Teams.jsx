import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'

import Team from '../components/Team'
import TeamNew from '../components/TeamNew'

export default class Teams extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = { teams: props.data }
  }

  addTeam(team) {
    let teams = update(this.state.teams, {$push: [team]})
    this.setState({ teams: teams })
  }

  deleteTeam(team) {
    let index = this.state.teams.indexOf(team)
    let teams = update(this.state.teams, {$splice: [[index, 1]]})
    this.setState({ teams: teams })
  }

  handleEditTeam(team) {
    let index = this.state.teams.indexOf(team)
    let teams = update(this.state.teams, {$splice: [[index, 1, team]]})
    this.setState({ teams: teams} )
  }

  handleEditTeam(team, data) {
    var index = this.state.teams.indexOf(team)
    var teams = update(this.state.teams, {$splice: [[index, 1, data]]})
    this.setState({ teams: teams} )
  }

  render() {
    var teams = this.state.teams.map((t, i) => {
      return <Team key={t.id} team={t}
                   handleDeleteTeam={team => this.deleteTeam(team)}
                   handleEditTeam={(team, data) => this.handleEditTeam(team, data)} />
    })

    return (
      <div className='teams'>
        <h2> Teams </h2>
        <TeamNew handleNewTeam={team => this.addTeam(team)}/>
        <hr />
        {teams}
      </div>
    )
  }
}
