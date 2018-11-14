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
            else
            {
                this.props.dispatch({ 
                    type: "loggedIn", 
                    userName: this.state.userName,
                    userType: this.state.userType
                })

                // Send the user to the homepage ('/')
                this.props.history.push('/');
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