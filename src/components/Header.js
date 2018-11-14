import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component
{
    render()
    {
        return (<div className='header'>

                    <div className='header-bar'>

                        <div className='header-lefthand-side'>
                            
                        </div>

                        <div className='header-righthand-side'>
                        {!this.props.loggedIn &&  <Link to='/login'>Login</Link>}
                        {!this.props.loggedIn &&  <Link to='/signup'>Signup</Link>}
                        {this.props.loggedIn &&  <Link to='/setprofile'>Set profile</Link>}
                         {/*SIGN OUT BUTTON*/}
                            
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