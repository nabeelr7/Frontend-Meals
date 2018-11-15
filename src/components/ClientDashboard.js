import React, { Component } from 'react';
import { connect } from 'react-redux';


class ClientDashboard extends Component{
    constructor(){
        super();
        this.state={}
    }

    render(){
        return(
        <div>
            <div> My Info </div>
            
        </div>
        )}
    
}

let ConnectedClientDashboard = connect()(ClientDashboard);
export default ConnectedClientDashboard