import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Header.css';
import SearchBar from './SearchBar'

class Header extends Component
{
    constructor(props)
    {
        super(props);

        // Bindings
        this.logout = this.logout.bind(this);
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
            console.log(response)
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
    goToDash(){

    }

    render()
    {
        return (<div className='header'>

                    <div className='header-bar'>

                        <div className='header-lefthand-side'>
                        <Link to='/'><img height='50px' alt="logoLink" src='/rawimages/logo.png'></img></Link>
                        <SearchBar/>
                        <br/>
                        <Link to ='/browse'><button>Browse</button></Link>
                        
                       
                            
                        </div>

                        <div className='header-righthand-side'>
                        {!this.props.loggedIn &&  <Link to='/login'><button>Login</button></Link>}
                        {!this.props.loggedIn &&  <Link to='/signup'><button>Signup</button></Link>}
                         {this.props.loggedIn && <Link to='/'><button onClick={this.logout}>Logout</button></Link>}
                         {this.props.loggedIn && <Link to='/chefdashboard'><button >My Dashboard</button></Link>}
                            
                        </div>

                    </div>

                    <div className='halfPlate'>Share a Meal</div>

                </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(Header);