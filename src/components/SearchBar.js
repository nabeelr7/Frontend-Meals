import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state={
            searchInput:''
            
        }
        this.handleSearchChange=this.handleSearchChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this);
}

onSubmit(event){
    event.preventDefault()
    let search = this.state.searchInput;
    let body = {query: search};

    if (this.props.loggedIn)
    {
        body.userCoordinates = this.props.userCoordinates;
    }

    fetch('/searchmeals', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }).then(x=>x.text()
    ).then(response=>{
        let parsed = JSON.parse(response)
        console.log(parsed)
        this.props.dispatch({type: 'topSearchBarResults', res: parsed})
        
        this.props.history.push('/browse')
        
    })
    this.setState({searchInput: ''})
}

handleSearchChange(event){
    this.setState({searchInput: event.target.value})
}

render(){
    return(<form 
            onSubmit={this.onSubmit} 
            className='seachContainer'>
            <input 
                className='searchBar' 
                placeholder="Search" 
                type="text" 
                
                onChange={this.handleSearchChange}
                />
            <input
                className='searchSubmit'
                type='submit'
                />
        </form>
    )}
}

function mapStateToProps(state)
{
    return {
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates
    }
}

let ConnectedSearchBar = connect(mapStateToProps)(SearchBar)
export default withRouter(ConnectedSearchBar)