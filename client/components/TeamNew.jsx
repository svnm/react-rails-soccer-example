import React, { PropTypes } from 'react';
import csrfHeader from '../lib/csrfHeader'
var initialState = { name: '', description: '' }

export default class TeamNew extends React.Component {
  static propTypes = {
    handleNewTeam: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleChange(e) {
    console.log(e.target)
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

    /* add an update X-CSRF-Token as a util */

    fetch('', {
      method: 'POST',
      headers: csrfHeader(),
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
    const { name, description } = this.state
    return (
      <form className='form-inline' onSubmit={e => this.handleSubmit(e)}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Name'
                 name='name' value={name}
                 onChange={e => this.handleChange(e)} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Description'
                 name='description' value={description}
                 onChange={e => this.handleChange(e)} />
        </div>

        <button type='submit' className='button' disabled={!this.valid()}>
          Create
        </button>
      </form>
    )
  }
}
