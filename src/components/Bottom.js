import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Bottom.css'
class Bottom extends Component {
    render() {
        return (
            <div className='bottom-bar'>

                <div className='bottom-lefthand-side'>
                    <div>About Us</div>
                    <div>Contact Us</div>
                    <div>Careers</div>
                </div>

                <div className='bottom-righthand-side'>
                    <div>Share</div>
                    <a href="http://www.facebook.com"> <img className="media-links" alt="facebook" src='/rawImages/facebook.png'></img> </a>
                    <a href="http://www.instagram.com"> <img className="media-links" alt="instagram" src='/rawImages/instagram.png'></img> </a>
                    <a href="http://www.twitter.com"> <img className="media-links" alt="twitter" src='/rawImages/twitter.png'></img> </a>
                    <a href="http://www.pinterest.com"> <img className="media-links" alt="pinterest" src='/rawImages/pinterest.png'></img> </a>

                </div>

            </div>
        )
    }
}


let connectedBottom = connect()(Bottom)
export default connectedBottom;