import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Header.css'

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
                        </div>

                    </div>

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