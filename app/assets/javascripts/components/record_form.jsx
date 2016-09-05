var initialState = {
    title: '',
    date: '',
    amount: ''
};

class RecordForm extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind('handleChange', 'valid', 'handleSubmit');
        this.state = initialState;
    }

    handleChange(event) {
        var name = event.target.name;
        var obj = {};
        obj[""+name] = event.target.value;
        this.setState(obj);
    }

    valid() {
        return this.state.title && this.state.date && this.state.amount;
    }

    handleSubmit(event) {
        event.preventDefault();

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
          this.props.handleNewRecord(data);
          this.setState(initialState);
        }).catch( (error) => {
          console.log('request failed', error)
        })
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Date"
                           name="date" value={this.state.date} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Title"
                           name="title" value={this.state.title} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" placeholder="Amount"
                           name="amount" value={this.state.amount} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid}>
                    Create Record
                </button>
            </form>
        );
    }
}

RecordForm.propTypes = {
    handleNewRecord: React.PropTypes.func.isRequired
};
