import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Bottom.css'
class Bottom extends Component
{
    render()
    {
        return (<div className='bottom'>

                    <div className='bottom-bar'>

                        <div className='bottom-lefthand-side'>
                            <div>About Us</div>
                            <div>Contact Us</div>
                            <div>Careers</div>
                        </div>

                        <div className='bottom-righthand-side'>
                           <div>Share on Social Media</div>
                           <img src='/rawImages/facebook.jpg'></img> {/*get actual images and proper endings.jpg>*/}
                           <img src='/rawImages/instagram.jpg'></img>
                            
                        </div>

                    </div>

                </div>
        )
    }
}


let connectedBottom = connect()(Bottom)
export default connectedBottom;