import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ChefCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }

   
    
    render() {
        return (<>
          <Link to={`/chef/${this.props.userName}`}> 
            <div className='card1'>
            <div className='card-top'>
                <img height='300px' src={this.props.profilePicturePath} alt='chef img' className='card-img'/>
                </div>
                <div className='card-bottom'>
                    <div>{this.props.userName}</div>
                    
                </div>
            </div>
            </Link> 
            </>
        )
    }
}

export default ChefCard