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


    handleSubmit(event) {
        event.preventDefault()
        //call geocode to get coordinates

        let geocode = function () {
            let fullAddress = this.state.address + ' ' + this.state.city
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: fullAddress,
                    key: "AIzaSyAH3-pCisuIKJUVEskFGCkfgzqVGkeYEzc"
                }
            })
                .then(function (response) {
                    let coordinates = response.data.results[0].geometry.location
                    fetch("/signup", {
                        method: "POST",
                        body: JSON.stringify({
                            userType: this.state.userType,
                            userName: this.state.userName,
                            password: this.state.password,
                            address: {
                                street: this.state.address,
                                city: this.state.city,

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
                        else {
                            this.props.dispatch({
                                type: "loggedIn",
                                userName: this.state.userName,
                                userType: this.state.userType,
                                userCoordinates: res.userCoordinates
                            });

                            this.props.history.push('/setProfile');
                        }
                    }.bind(this))
                }.bind(this)

                ).catch(function (error) {
                    console.log(error)
                    alert('something\'s wrong')
                })
        }
        geocode = geocode.bind(this)
        geocode()

    }


    render() {
        if (this.state.userType === undefined)
            return (
                <div className='login-container' id='diff'>
                    <div className='userType-title'>Will you be a Chef or a client?</div>
                    <button className='userType-btn' onClick={this.handleChefType}>CHEF</button>
                    <button className='userType-btn' onClick={this.handleClientType}>CLIENT</button>
                </div>
            )
        if (this.state.userType) {
            return (
                <div className='login-container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='auth-title'>Signup</div>
                        <div className='username-box'>
                            <div className='title'>Username</div>
                            <input className='input' type='text' onChange={this.handleUsernameChange} />
                        </div>
                        <div className='username-box'>
                            <div className='title'>Password</div>
                            <input className='input' type='password' onChange={this.handlePasswordChange} />
                        </div>
                        <div className='username-box'>
                            <div className='title'>Email</div>
                            <input className='input' type='text' />
                        </div>
                        <div className='username-box'>
                            <div className='title'>Address</div>
                            <input className='input' type='text' placeholder='Number and Street' onChange={this.handleAddressChange} />
                            <div>
                            <input className='input' type='text' placeholder='City' onChange={this.handleCityChange} />
                            </div>
                        </div>
                        <input type='submit' value='SUBMIT'className='submit'/>
                    </form>
                </div>
            )
        }
    }
}

let ConnectedSignup = connect()(Signup)
export default ConnectedSignup