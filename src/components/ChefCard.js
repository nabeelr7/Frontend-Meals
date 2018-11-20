import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ChefCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }

   
    
    render() {
        return (<div className='chefCard'>
          <Link to={`/chef/${this.props.userName}`}> 
            <div className='card-top'>
                <img  src={this.props.profilePicturePath} alt='chef img' className='chef-img'/>
                </div>
                <div className='card-bottom'>
                    <div className='chef-card-name'>{this.props.userName}</div>
                </div>
            </Link> 
            </div>
        )
    }
}

export default ChefCard