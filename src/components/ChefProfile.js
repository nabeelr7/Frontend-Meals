import React, { Component } from 'react';
import { connect } from 'react-redux';


class ChefProfile extends Component{
    constructor(){
        super();
        this.state={}
    }

    render(){
        <div>
            <div> Chef Info </div>
            
        </div>
    }
}

let ConnectedChefProfile = connect()(ChefProfile);
export default ConnectedChefProfile