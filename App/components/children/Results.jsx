import React, {Component} from 'react'


class Results extends Component{
    constructor(props){
        super(props)
    }

    render(){
        // create an element that is going to be rendered in the Results component 
        // map the results array and return JSX component ... 
        let Article = this.props.articles.map((i,index)=>{
            let key = index;
            return ( <div className="panel panel-default">
                        <div className="panel-body">
                             <a href={i.link} id={key} target="_blank"><h4>{i.title}</h4></a>
                              <button onClick={this.props._saveArticle} data-link={i.link} data-title={i.title} data-id={key}   type="button" className="btn btn-muted pull-right">Save</button>
                        </div>
                     </div>
                    )
        })
        return(
             <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Results</h3>
                </div>
                <div className="panel-body">
                    {Article}
                </div>
            </div>
        )
    }
}

export default Results;