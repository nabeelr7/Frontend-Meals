import React, { Component } from 'react';
import { connect } from 'react-redux';


class ChefProfile extends Component{
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
            body: JSON.stringify({userName: this.props.match.params})
        }).then((x)=>x.text())
        .then((response)=>{
        let parsed=JSON.parse(response)
        this.setState({profile: parsed})})

        fetch('/getitemsbychef', {
            method: "POST",
            body: {userName: this.props.match.params}
        })
    }
    render(){
        if (!this.state.profile){return <div>Loading..</div>}
        else
        {return(<div>
            <img className='chefProfilePic' alt="profilePic" src = {this.props.image}></img>
            <div>{this.profile.userName}</div>
            <br/>
            <div>{this.profile.bio}</div>
            
            
        </div>
        )}
    }
}

let mapStateToProps= function( state){
    return {
        userName : state.userName
    }
}

let ConnectedChefProfile = connect(mapStateToProps)(ChefProfile);
export default ConnectedChefProfile