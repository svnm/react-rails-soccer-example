class Team extends BaseComponent {
  constructor(props){
    super(props)
    this._bind('handleDelete', 'handleToggle', 'handleEdit')
    this.state = { edit: false }
  }

  handleDelete(e) {
    var id = 'teams/' + this.props.team.id
    e.preventDefault()

    fetch(id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      credentials: 'same-origin'
    })
    .then( (response) => {
      this.props.handleDeleteTeam(this.props.team);
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  handleEdit(e) {
    e.preventDefault();
    var url = 'teams/' + this.props.team.id
    var data = {
      name: ReactDOM.findDOMNode(this.refs.name).value,
      description: ReactDOM.findDOMNode(this.refs.description).value,
    }
    console.log(data)

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      credentials: 'same-origin',
      body: JSON.stringify({ team: data })
    }).then( (response) => {
      return response.json()
    }).then((data) => {
      this.setState({ edit: false })
      this.props.handleEditTeam(this.props.team, data)
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  handleToggle(e) {
    e.preventDefault()
    this.setState({ edit: !this.state.edit })
  }

  showForm() {
    const { team } = this.props
    console.log(team)
    return (
      <div>
        <span>{team.name}</span>
        <span>{team.description}</span>
        <a className='button' onClick={this.handleToggle}>Edit</a>
        <a className='button' onClick={this.handleDelete}>Delete</a>
      </div>
    )
  }

  editForm() {
    const { team } = this.props
    return (
      <div>
        <input className='form-control' type='text' defaultValue={team.name} ref='name' />
        <input className='form-control' type='text' defaultValue={team.description} ref='description' />

        <a className='button' onClick={this.handleEdit}>Update</a>
        <a className='button' onClick={this.handleToggle}>Cancel</a>
      </div>
    );
  }

  render() {
      return this.state.edit ? this.editForm() : this.showForm();
  }
}

Team.propTypes = {
    team: React.PropTypes.object.isRequired,
    handleDeleteTeam: React.PropTypes.func.isRequired,
    handleEditTeam: React.PropTypes.func.isRequired
};
