import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
<<<<<<< HEAD
import './Header.css';
=======
import './Header.css'
>>>>>>> 0903b72ee7e4a2712399e67b6cf58fdd39bd2e1d

class Header extends Component
{
    render()
    {
        return (<div className='header'>

                    <div className='header-bar'>

                        <div className='header-lefthand-side'>
                            
                        </div>

                        <div className='header-righthand-side'>
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Signup</Link>
                            <Link to='/setprofile'>Set profile</Link>
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

    }
}

export default connect(mapStateToProps)(Header);