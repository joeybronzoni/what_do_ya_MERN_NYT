import React, {Component} from 'react'


class Saved extends Component{
    constructor(props){
        super(props);
    }
        
    render(){
        let savedArticle = this.props.savedArticles.map((i,index)=>{
             let key = index;
            return ( 
                    <div className="panel panel-default">
                        <div className="panel-body">
                             <a href={i.link}  target="_blank"><h4>{i.title}</h4></a>
                            <button onClick={this.props._deleteArticle} key={key} data-link={i.link} data-title={i.title} type="button" className="btn btn-muted pull-right">Delete</button>
                        </div>
                     </div>
                )
            })
            return (
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Saved Articles</h3>
                        </div>
                            {savedArticle}
                        <div className="panel-body">
                        </div>
                    </div>
            );
    }
} 

export default Saved;