import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styling-files/login-signup.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleUsernameChange(event) {
        this.setState({ userName: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault()
        fetch('/login', {
            method: "POST",
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            })
        }).then(function (x) {
            return x.text()
        }).then(function (res) {

            let parsed = JSON.parse(res)

            if (!parsed.success) {
                alert(parsed.msg)
            }
            else {
                this.props.dispatch({
                    type: "loggedIn",
                    userName: this.state.userName,
                    userType: parsed.userType,
                    userCoordinates: parsed.userCoordinates
                })

                // Send the user to the homepage ('/')
                this.props.history.push('/');
            }
        }.bind(this))
    }
    render() {
        return (
            <div className='login-container'>
                <form onSubmit={this.handleSubmit}>
                    <div className='auth-title'>Login</div>
                    <div className='username-box'>
                        <div className='title'>Username</div>
                        <input className='input' type='text' onChange={this.handleUsernameChange} />
                    </div>
                    <div className='username-box'>
                        <div className='title'>Password</div>
                        <input className='input' type='password' onChange={this.handlePasswordChange} />
                    </div>
                    <input type='submit' value='SUBMIT' className='submit'/>
                </form>
            </div>
        )
    }
}

let ConnectedLogin = connect()(Login)
export default ConnectedLogin