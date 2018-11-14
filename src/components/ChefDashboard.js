import React, { Component } from 'react';
import { connect } from 'react-redux';


class ChefDashboard extends Component{
    constructor(){
        super();
        this.state={}
    }

    render(){
        <div>
            <div> My Info </div>
        </div>
    }
}

let ConnectedChefDashboard = connect()(ChefDashboard);
export default ConnectedChefDashboard