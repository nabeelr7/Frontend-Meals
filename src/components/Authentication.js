import React, { Component } from 'react';
import { connect } from 'react-redux';

class Authentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleHostType = this.handleHostType.bind(this)
        this.handleClientType = this.handleClientType.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handlePostalChange = this.handlePostalChange.bind(this)
        this.handleLoginSubmit= this.handleLoginSubmit.bind(this)
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    }
    handleHostType() {
        this.setState({ userType: "host" })
    }
    handleClientType() {
        this.setState({ userType: "client" })
    }
    handleUsernameChange(event) {
        this.setState({ username: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    handleAddressChange(event) {
        this.setState({ street: event.target.value })
    }
    handleCityChange(event) {
        this.setState({ city: event.target.value })
    }
    handlePostalChange(event) {
        this.setState({ postal: event.target.value })
    }
    handleSignupSubmit(event) {
        event.preventDefault()
        fetch("/signup",{
            method:"POST",
            body: JSON.stringify({
                userType: this.state.userType,
                username: this.state.username,
                password: this.state.password,
                address: {
                    street: this.state.street,
                    city: this.state.city,
                    postal: this.state.postal
                }
            })
        }).then(function(x) {
            return x.text()
        }).then(function(res){
            if (!res.success) {
                alert("Username already taken")
            }
            if (res.success){
                this.props.dispatch({type: "loggedIn", username: this.state.username})
            }
        })
    }
    handleLoginSubmit(event){
        event.preventDefault()
        fetch('/login', {
            method:"POST",
            body: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(function(x) {
            return x.text()
        }).then(function(res){
            let parsed = JSON.parse(res)
            if(!parsed.success) {
                alert ("Incorrect username or password")
            }
            if (parsed.success) {
                this.props.dispatch({type:"loggedIn", username:this.state.username})
            }
        })
    }
    render() {
        if (this.state.userType === undefined)
            return (
                <div>
                    <div>Will you be a host or a client?</div>
                    <button onClick={this.handleHostType}>Host</button>
                    <button onClick={this.handleClientType}>Client</button>
                </div>
            )
        if (this.state.userType) {
            return (
                <div>
                    <form onSubmit={this.handleSignupSubmit}>
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
        if (this.state.login) {
            return (
                <div>
                    <form onSubmit={this.handleLoginSubmit}>
                    <div>Login</div>
                    <div>Username</div>
                    <input type='text' onChange={this.handleUsernameChange}/>
                    <div>Password</div>
                    <input type='password' onChange={this.handlePasswordChange}/>
                    <input type='submit'/>
                    </form>
                </div>
            )
        }
    }
}

let ConnectedAuthentication = connect()(Authentication)
export default ConnectedAuthentication