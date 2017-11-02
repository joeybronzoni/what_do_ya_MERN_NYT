import React, {Component} from 'react';

// create React Component //
class Search extends Component {
    //constructor function for setting state ... 
    constructor(props){
        // super function for passing props to the parrent element 
        super(props)
        // bind functions with the object//
        this._changeInputField = this._changeInputField.bind(this);
        this._submitForm = this._submitForm.bind(this);
        // set the initial state of the component ... in this case all the fields are blank
        this.state = {
            query : '',
            startYear : '',
            endYear : ''
        }

    }
    // Function for capturing the input of the fields 
    _changeInputField(e){
        // capture the input from the topic ID and set it to the component state of querry 
        if(e.target.id === 'topic'){
            this.setState({query: e.target.value})
        }
        // capture the input from the topic ID and set it to the component state of startYear 
        if(e.target.id === 'start-year'){
             this.setState({startYear: e.target.value})
        }
        // capture the input from the topic ID and set it to the component state of endYear 
        if(e.target.id === 'end-year'){
             this.setState({endYear: e.target.value})
        }
    
    }
    _submitForm(e){
        e.preventDefault();
        // pass the newly formed search object back to the parrent through the props ... 
        this.props._searchTerm(this.state.query, this.state.startYear, this.state.endYear)
        // reset the state of the input fields to blank after the submit event 
        this.setState({
            query : '',
            startYear : '',
            endYear : ''
        });
    }
    // render function ... 
    render(){
        return(
            <div className="panel-body">
                <form onSubmit={this._submitForm}>
                    <div className="form-group">
                        <label htmlFor="topic">Topic</label>
                        <input value={this.state.query} onChange={this._changeInputField} type="text" className="form-control" id="topic" placeholder="Topic..."></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start-year">Start Year</label>
                        <input value={this.state.startYear} onChange={this._changeInputField} type="number" className="form-control" id="start-year" placeholder="YYYYMMDD..."></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="end-year">End Year</label>
                        <input value={this.state.endYear} onChange={this._changeInputField} type="number" className="form-control" id="end-year" placeholder="YYYYMMDD..."></input>
                    </div>
                    <button type="submit" className="btn btn-muted">Submit</button>
                </form>
            </div>
        );
    }
}

export default Search;
