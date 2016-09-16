import React, { PropTypes } from 'react';
import csrfHeader from '../lib/csrfHeader'
var initialState = { name: '', description: '' }

export default class PlayerNew extends React.Component {
  static propTypes = {
    handleNewPlayer: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleChange(e) {
    var name = e.target.name
    var obj = {}
    obj['' + name] = e.target.value
    this.setState(obj)
  }

  valid() {
    return this.state.name
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('', {
      method: 'POST',
      headers: csrfHeader(),
      credentials: 'same-origin',
      body: JSON.stringify(this.state)
    }).then( (response) => {
      return response.json();
    }).then((data) => {
      this.props.handleNewPlayer(data);
      this.setState(initialState);
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  render() {
    const { name } = this.state
    return (
      <form className='form-inline' onSubmit={e => this.handleSubmit(e)}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Name'
                 name='name' value={name}
                 onChange={e => this.handleChange(e)} />
        </div>
        <button type='submit' className='button' disabled={!this.valid()}>
          Create
        </button>
      </form>
    )
  }
}
