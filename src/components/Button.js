import React, { Component } from 'react';
import { connect } from 'react-redux';


class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        if (this.props.buttonName === 'Accept') {
            fetch('/updaterequeststatus', {
                method: "POST",
                body: JSON.stringify({
                    _id: this.props._id,
                    status: 1,
                    userType: this.props.userType,
                    userName: this.props.userName
                })
            }).then(function (x) {
                return x.text()
            }).then(function (response) {
                this.props.formatResponse(response)
            }.bind(this))
        }
        if (this.props.buttonName === 'Decline') {
            fetch('/updaterequeststatus', {
                method: "POST",
                body: JSON.stringify({
                    _id: this.props._id,
                    status: 2,
                    userType: this.props.userType,
                    userName: this.props.userName
                })
            }).then(function(x){
                return x.text()
            }).then(function (response) {
                this.props.formatResponse(response)                
            }.bind(this))
        }
        if (this.props.buttonName === 'Pickup_in_Person') {
            fetch('/updaterequeststatus', {
                method: "POST",
                body: JSON.stringify({
                    _id: this.props._id,
                    status: 4,
                    userType: this.props.userType,
                    userName: this.props.userName
                })
            }).then(function (x) {
                return x.text()
            }).then(function (response) {
                this.props.formatResponse(response)
            }.bind(this))
        }
        if (this.props.buttonName === 'Will_Send_a_Car') {
            fetch('/updaterequeststatus', {
                method: "POST",
                body: JSON.stringify({
                    _id: this.props._id,
                    status: 5,
                    userType: this.props.userType,
                    userName: this.props.userName
                })
            }).then(function (x) {
                return x.text()
            }).then(function (response) {
                this.props.formatResponse(response)
            }.bind(this))
        }
    }
    render() {
        return (
            <button onClick={this.handleClick}>{this.props.buttonName}</button>
        )
    }
}

let mapStateToProps = function(state){
    return {
        userType: state.userType,
        userName: state.userName
    }
}

let ConnectedButton = connect(mapStateToProps)(Button)

export default ConnectedButton