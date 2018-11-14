import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleChefType = this.handleChefType.bind(this)
        this.handleClientType = this.handleClientType.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handlePostalChange = this.handlePostalChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChefType() {
        this.setState({ userType: "chef" })
    }
    handleClientType() {
        this.setState({ userType: "client" })
    }
    handleUsernameChange(event) {
        this.setState({ userName: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    handleAddressChange(event) {
        this.setState({ address: event.target.value })
    }
    handleCityChange(event) {
        this.setState({ city: event.target.value })
    }
    handlePostalChange(event) {
        this.setState({ postal: event.target.value })
    
    }
    handleSubmit(event) {
        event.preventDefault()
        //call geocode to get coordinates
        debugger
        
        function geocode(){
            let fullAddress = this.state.address+' '+this.state.city+' '+this.state.postal
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: fullAddress,
                    key: "AIzaSyAH3-pCisuIKJUVEskFGCkfgzqVGkeYEzc"
                    }
             })
             .then(function(response){
                 console.log(response) 
                 let coordinates=response.data.results[0].geometry.location
                 fetch("/signup", {
                    method: "POST",
                    body: JSON.stringify({
                        userType: this.state.userType,
                        userName: this.state.userName,
                        password: this.state.password,
                        address: {
                            street: this.state.address,
                            city: this.state.city,
                            postal: this.state.postal
                        },
                        coordinates: coordinates
                    })
                }).then(function (x) {
                    return x.text()
                }).then(function (res) {
        
                    res = JSON.parse(res);
        
                    if (!res.success) {
                        alert("Username already taken")
                    }
                    if (res.success) {
                        this.props.dispatch({ type: "loggedIn", userName: this.state.userName, userType: this.state.userType})
                        this.props.history.push('/setProfile')
                    }
                }.bind(this))
    }.bind(this)
                 //fetch to backend create account
             ).catch(function(error){
                console.log(error)
                alert('something\'s wrong')
             })
            }
            geocode=geocode.bind(this)
            geocode()

        }
            
        

    render() {
        if (this.state.userType === undefined)
            return (
                <div>
                    <div>Will you be a Chef or a client?</div>
                    <button onClick={this.handleChefType}>Chef</button>
                    <button onClick={this.handleClientType}>Client</button>
                </div>
            )
        if (this.state.userType) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>Signup</div>
                        <div>Username</div>
                        <input type='text' onChange={this.handleUsernameChange} />
                        <div>Password</div>
                        <input type='password' onChange={this.handlePasswordChange} />
                        <div>Email</div>
                        <input type='text' />
                        <div>Address</div>
                        <input type='text' placeholder='Number and Street' onChange={this.handleAddressChange} />
                        <input type='text' placeholder='City' onChange={this.handleCityChange} />
                        <input type='text' placeholder='Postal Code' onChange={this.handlePostalChange} />
                        <input type='submit' />
                    </form>
                </div>
            )
        }
    }
}

let ConnectedSignup = connect()(Signup)
export default ConnectedSignup