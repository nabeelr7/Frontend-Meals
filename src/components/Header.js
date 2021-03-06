import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './styling-files/Header.css';
import SearchBar from './SearchBar'
import {withRouter} from 'react-router';

class Header extends Component
{
    constructor(props)
    {
        super(props);

        // Bindings
        this.logout = this.logout.bind(this);
        this.sendToBrowse = this.sendToBrowse.bind(this)
    }

    logout(evt)
    {
        // Fetch the logout endpoint, then dispatch a 'loggedOut' action
        fetch('/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(function(response){ return response.text()})
        .then(function(response){
            
            let parsed = JSON.parse(response);
           
            if(parsed.success)
            {
                this.props.dispatch({type: 'loggedOut'});
            }
            else
            {
                console.log('not sure why logout would fail, but it just did...')
            }

        }.bind(this))
    }

    sendToBrowse(evt)
    {
        // We need to make sure the browse component doesn't think we're searching before we navigate
        this.props.dispatch({type: 'stopSearching'});
        this.props.history.push('/browse');
    }
    
    render()
    {
        return (<div className='header'>

                    <div className='header-bar'>
                        <div className='logo'>
                            <Link to='/'><div className='logo-name'>Meal-Prep</div></Link>
                            </div>
                        <div className='header-lefthand-side'>
                            <SearchBar/>
                            <button className='browseBtn'onClick={this.sendToBrowse}>BROWSE</button>
                        </div>

                        <div className='header-righthand-side'>
                            {!this.props.loggedIn &&  <Link to='/login'><button className='loginBtn'>LOGIN</button></Link>}
                            {!this.props.loggedIn &&  <Link to='/signup'><button className='signupBtn'>SIGNUP</button></Link>}
                            {this.props.loggedIn && <Link to='/'><button onClick={this.logout} className='loginBtn'>LOGOUT</button></Link>}
                            {(this.props.loggedIn && this.props.userType==='chef') && <Link to='/chefdashboard'><button className='signupBtn' id='dash'>MY DASHBOARD</button></Link>}
                            {(this.props.loggedIn && this.props.userType==='client') && <Link to='/clientdashboard'><button className='signupBtn' id='dash'>MY DASHBOARD</button></Link>}     
                        </div>

                    </div>

                    <div className='halfPlate'>Meal-Prep</div>

                </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        loggedIn: state.loggedIn,
        userType: state.userType,
        searchResults: state.searchBarResults
    }
}

export default withRouter(connect(mapStateToProps)(Header));