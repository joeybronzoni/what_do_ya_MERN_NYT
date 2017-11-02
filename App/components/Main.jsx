import React, {Component} from 'react'
import Search from './children/Search.jsx'
import Axios from './utilities/axios.js'
import Results from './children/Results.jsx'
import Saved from './children/Saved.jsx'

class Main extends Component {
    constructor(props){
        super(props);
        // bind the prop to *this* component since the values form that prop are going to be passed back 
        // to update a method in this component object 
           this._searchTerm = this._searchTerm.bind(this);
           this._saveArticle= this._saveArticle.bind(this);
           this._deleteArticle= this._deleteArticle.bind(this);
  
        // set the state of the object
        this.state = {
            query: '',
            startYear: '',
            endYear: '',
            searchResults:[],
             savedArticles:[]
        }
    }

 /////////////////////////
    // pass in the props from the "search" child element... when input fields are submitted
    // the input values are goning to be passed here via the this.props.searchTerm
    // set the state of the component with the props from the child ** see SEARCH.jsx are being passed in ... 
    _searchTerm(query, startYear, endYear){
        this.setState({
            query: query,
            startYear: startYear,
            endYear: endYear
        });
         
    }
    // save artice function 
    _saveArticle(e){
        e.preventDefault();
        let article = {
            title: e.target.getAttribute('data-title'),
            link: e.target.getAttribute('data-link')
        }
        // first set the saved array equal to the current state.saved to avoid deleting already saved articles
        let array = this.state.savedArticles;
        // push article into the temporary saved array ...
        array.push(article);
        // re set the state to reflect the changes in the array 
        this.setState({savedArticles: array});
        // make axios call with the article object 
        Axios.saveArticle(article)
    }
    // delete article function
    
    _deleteArticle(e){
          e.preventDefault();
          let article = {
            title: e.target.getAttribute('data-title'),
            link: e.target.getAttribute('data-link')
        }

        let savedArray = this.state.savedArticles;
        let index = savedArray.find(x => x.title == article.title);
        savedArray.splice(index, 1);
        this.setState({savedArticles: savedArray});
        Axios.deleteArticle(article)
    }
    // ********* LIFE CYCLE METHOD ************** //
    // checks to see if the component was re rendered or has a change in state  or prop 
    componentDidUpdate(prevProps, prevState){
        // check to see if previous component state is different form current comp state ... if is run the axios function for... 
        if(prevState.query !== this.state.query || prevState.startYear !== this.state.startYear || prevState.endYear !== this.state.endYear){
            // run the axios API call... 
            Axios.call(this.state.query, this.state.startYear, this.state.endYear)
                .then((data)=>{
               //check to see that we are not sending in duplicate data
                if(data !== this.state.result){
                    console.log(data);
                    // set the state of the result to the return data from the API call .... 
                    this.setState({
                        searchResults: data
                    });
                }
            })
        }
    } // end of componentDidUpdate

    componentWillMount() {
        Axios.getArticle()
        .then((data)=>{
             let savedArray = this.state.savedArticles.slice();
                savedArray = data.data;
                this.setState({ savedArticles: savedArray });
        });
        
   }

    // pass down the props to the children ... <Search searchTerm={this.searchTerm} is passing down
    // the search Term prop down to the search child ... ect... 
    render(){
        return(
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="text-center">New York Times API</h1>
                        <h3 className="text-center">Search for articles of interest!</h3>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Search _searchTerm={this._searchTerm} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Results articles={this.state.searchResults} _saveArticle={this._saveArticle} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Saved _deleteArticle={this._deleteArticle} savedArticles={this.state.savedArticles}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;

