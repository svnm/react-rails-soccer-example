var initialState = {
  name: '',
  description: ''
}

class TeamNew extends BaseComponent {
  constructor(props) {
    super(props)
    this._bind('handleChange', 'valid', 'handleSubmit')
    this.state = initialState
  }

  handleChange(e) {
    var name = e.target.name
    var obj = {}
    obj['' + name] = e.target.value
    this.setState(obj)
  }

  valid() {
    return this.state.name && this.state.description
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      credentials: 'same-origin',
      body: JSON.stringify(this.state)
    }).then( (response) => {
      return response.json();
    }).then((data) => {
      this.props.handleNewTeam(data);
      this.setState(initialState);
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  render() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Description'
                 name='description' value={this.state.description} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Name'
                 name='name' value={this.state.name} onChange={this.handleChange} />
        </div>

        <button type='submit' className='button' disabled={!this.valid}>
          Create
        </button>
      </form>
    )
  }
}

TeamNew.propTypes = {
    handleNewTeam: React.PropTypes.func.isRequired
}
