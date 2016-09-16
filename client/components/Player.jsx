import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom'
import csrfHeader from '../lib/csrfHeader'
let initialState = { edit: false }

export default class Player extends React.Component {
  static propTypes = {
    player: React.PropTypes.object.isRequired,
    handleDeletePlayer: React.PropTypes.func.isRequired,
    handleEditPlayer: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleDelete(e) {
    var id = 'players/' + this.props.player.id
    e.preventDefault()

    fetch(id, {
      method: 'DELETE',
      headers: csrfHeader(),
      credentials: 'same-origin'
    })
    .then( (response) => {
      this.props.handleDeletePlayer(this.props.player);
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  handleEdit(e) {
    e.preventDefault();
    var url = 'players/' + this.props.player.id
    var data = {
      name: ReactDOM.findDOMNode(this.refs.name).value
    }

    fetch(url, {
      method: 'PUT',
      headers: csrfHeader(),
      credentials: 'same-origin',
      body: JSON.stringify({ player: data })
    }).then( (response) => {
      return response.json()
    }).then((data) => {
      this.setState({ edit: false })
      this.props.handleEditPlayer(this.props.player, data)
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  handleToggle(e) {
    e.preventDefault()
    this.setState({ edit: !this.state.edit })
  }

  showForm() {
    const { player } = this.props
    return (
      <div>
        <span>{player.name}</span>
        <a className='button' onClick={e => this.handleToggle(e)}>Edit</a>
        <a className='button' onClick={e => this.handleDelete(e)}>Delete</a>
      </div>
    )
  }

  editForm() {
    const { player } = this.props
    return (
      <div>
        <input className='form-control' type='text' defaultValue={player.name} ref='name' />
        <a className='button' onClick={e => this.handleEdit(e)}>Update</a>
        <a className='button' onClick={e => this.handleToggle(e)}>Cancel</a>
      </div>
    );
  }

  render() {
    const { edit } = this.state
    return edit ? this.editForm() : this.showForm()
  }
}
