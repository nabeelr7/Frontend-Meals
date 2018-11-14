import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Header.css';

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

    render()
    {
        return (<div className='header'>

                    <div className='header-bar'>

                        <div className='header-lefthand-side'>
                            
                        </div>

                        <div className='header-righthand-side'>
                        {!this.props.loggedIn &&  <Link to='/login'><button>Login</button></Link>}
                        {!this.props.loggedIn &&  <Link to='/signup'><button>Signup</button></Link>}
                         {this.props.loggedIn && <button onClick={this.logout}>Logout</button>}
                            
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