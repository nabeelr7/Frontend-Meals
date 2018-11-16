import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from './stripe.js';



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

        fetch('/getrequests', {
            method: "POST",
            body: JSON.stringify({
                userName: this.props.userName
            })
        }).then(function (x){
            return x.text()
        }).then(function(response){
            let parsed = JSON.parse(response)
            if (parsed.success) {
                this.setState({requests: parsed.result})
            // DO OTHER STUFF M,AP THROUGH POUT IN DIVS SORT BY STATUS ETC
        }
        })
    }
    render(){
        if (!this.state.profile){return <div>Loading..</div>}
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
        userName : state.userName,
        userType : state.userType
    }
}

let ConnectedClientDashboard = connect(mapStateToProps)(ClientDashboard);
export default ConnectedClientDashboard