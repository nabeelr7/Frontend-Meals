import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        this.setState({ username: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault()
        fetch('/login', {
            method: "POST",
            body: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(function (x) {
            return x.text()
        }).then(function (res) {

            let parsed = JSON.parse(res)

            if (!parsed.success) {
                alert("Incorrect username or password")
            }
            if (parsed.success) {
                this.props.dispatch({ type: "loggedIn", username: this.state.username, userType: "client"})
            }
        }.bind(this))
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>Login</div>
                    <div>Username</div>
                    <input type='text' onChange={this.handleUsernameChange} />
                    <div>Password</div>
                    <input type='password' onChange={this.handlePasswordChange} />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

let ConnectedLogin = connect()(Login)
export default ConnectedLogin