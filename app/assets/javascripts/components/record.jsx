class Record extends BaseComponent {
  constructor(props){
    super(props)
    this._bind('handleDelete', 'handleToggle', 'recordRow', 'recordForm', 'handleEdit')
    this.state = { edit: false }
  }

  handleDelete(e) {
    var id = "records/" + this.props.record.id
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
      this.props.handleDeleteRecord(this.props.record);
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  handleEdit(e) {
    e.preventDefault();
    var url = "records/" + this.props.record.id
    var data = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      date: ReactDOM.findDOMNode(this.refs.date).value,
      amount: ReactDOM.findDOMNode(this.refs.amount).value
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      credentials: 'same-origin',
      body: JSON.stringify({ record: data })
    }).then( (response) => {
      return response.json()
    }).then((data) => {
      this.setState({ edit: false })
      this.props.handleEditRecord(this.props.record, data)
    }).catch( (error) => {
      console.log('request failed', error)
    })
  }

  handleToggle(e) {
    e.preventDefault()
    this.setState({ edit: !this.state.edit })
  }

  recordRow() {
    return (
      <div>
        <span>{this.props.record.date}</span>
        <span>{this.props.record.title}</span>
        <span>{amountFormat(this.props.record.amount)}</span>
        <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
        <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
      </div>
    )
  }

  recordForm() {
    return (
      <div>
        <input className="form-control" type="text" defaultValue={this.props.record.date} ref="date"/>
        <input className="form-control" type="text" defaultValue={this.props.record.title} ref="title"/>
        <input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount"/>

        <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
        <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
      </div>
    );
  }

  render() {
      return this.state.edit ? this.recordForm() : this.recordRow();
  }
}

Record.propTypes = {
    record: React.PropTypes.object.isRequired,
    handleDeleteRecord: React.PropTypes.func.isRequired,
    handleEditRecord: React.PropTypes.func.isRequired
};
