class Teams extends BaseComponent {
  constructor(props) {
    super()
    this._bind('addTeam', 'deleteTeam', 'handleEditTeam')
    this.state = { teams: props.data }
  }

  addTeam(team) {
    var teams = React.addons.update(this.state.teams, {$push: [team]})
    this.setState({ teams: teams })
  }

  deleteTeam(team) {
    var index = this.state.teams.indexOf(team)
    var teams = React.addons.update(this.state.teams, {$splice: [[index, 1]]})
    this.setState({ teams: teams })
  }

  handleEditTeam(team, data) {
    var index = this.state.teams.indexOf(team)
    var teams = React.addons.update(this.state.teams, {$splice: [[index, 1, data]]})
    this.setState({ teams: teams} )
  }

  render() {
    var teams = this.state.teams.map((t, i) => {
      return <Team key={t.id} team={t}
                     handleDeleteTeam={this.deleteTeam}
                     handleEditTeam={this.handleEditTeam} />
    })

    return (
      <div className='teams'>
        <h2> Teams </h2>
        <TeamNew handleNewTeam={this.addTeam} />
        <hr />
        {teams}
      </div>
    )
  }
}

Teams.defaultProps = {
  teams: []
}
