import React, { Component } from 'react';
import { connect } from 'react-redux';


class ClientDashboard extends Component{
    constructor(){
        super();
        this.state={
            profile: ''
        }
    }
    componentDidMount(){
        fetch('/getprofile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({userName: this.props.userName})
        }).then((x)=>x.text())
        .then((response)=>{
        let parsed=JSON.parse(response)
        this.setState({profile: parsed})})
    }
    render(){
        if (!profile){return <div>Loading..</div>}
        else
        {return(<div>
            <img className='clientProfilePic' alt="profilePic" src = {this.props.image}></img>
            <div>{this.profile.userName}</div>
            <br/>
        </div>
        )}
    }
}

let mapStateToProps= function(state){
    return {
        userName : state.userName
    }
}

let ConnectedChefProfile = connect(mapStateToProps)(ClientDashboard);
export default ConnectedClientDashboard