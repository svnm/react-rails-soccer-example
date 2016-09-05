class Record extends BaseComponent {
    constructor(props){
        super(props);
        this._bind('handleDelete', 'handleToggle', 'recordRow', 'recordForm', 'handleEdit');
        this.state = { edit: false };
    }

    handleDelete(event) {
        var id = "records/" + this.props.record.id;
        event.preventDefault();

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

    handleEdit(event) {
        event.preventDefault();
        var id = "records/" + this.props.record.id;
        var data = {
            title: ReactDOM.findDOMNode(this.refs.title).value,
            date: ReactDOM.findDOMNode(this.refs.date).value,
            amount: ReactDOM.findDOMNode(this.refs.amount).value
        };

        fetch(id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          },
          credentials: 'same-origin',
          body: JSON.stringify({ record: data })
        }).then( (response) => {
          return response.json();
        }).then((data) => {
          this.setState({ edit: false });
          this.props.handleEditRecord(this.props.record, data);
        }).catch( (error) => {
          console.log('request failed', error)
        })
    }

    handleToggle(event) {
        event.preventDefault();
        this.setState({ edit: !this.state.edit });
    }

    recordRow() {
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{amountFormat(this.props.record.amount)}</td>
                <td>
                    <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
                    <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
                </td>
            </tr>
        );
    }

    recordForm() {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" defaultValue={this.props.record.date} ref="date"/>
                </td>
                <td>
                    <input className="form-control" type="text" defaultValue={this.props.record.title} ref="title"/>
                </td>
                <td>
                    <input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount"/>
                </td>
                <td>
                    <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
                    <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
                </td>
            </tr>
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
