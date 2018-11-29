import React, { Component } from 'react';
import { connect } from 'react-redux';


// This component handles request updates by taking the name of the button clicked and updating the request accordingly

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        switch (this.props.buttonName) {
            //checks to see the name of the button that was given as a props
            case 'Accept':
                fetch('/updaterequeststatus', {
                    method: "POST",
                    body: JSON.stringify({
                        _id: this.props._id,
                        //change request status in database. Statuses are from 0-5
                        status: 1,
                        userType: this.props.userType,
                        userName: this.props.userName
                    })
                }).then(function (x) {
                    return x.text()
                }).then(function (response) {
                    //send the response to the formatResponse function for formatting
                    this.props.formatResponse(response)
                }.bind(this))
                break;

            case 'Decline':
                fetch('/updaterequeststatus', {
                    method: "POST",
                    body: JSON.stringify({
                        _id: this.props._id,
                        status: 2,
                        userType: this.props.userType,
                        userName: this.props.userName
                    })
                }).then(function (x) {
                    return x.text()
                }).then(function (response) {
                    this.props.formatResponse(response)
                }.bind(this))
                break;

            case 'Pickup in Person':
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
                break;

            case 'Will Send a Car':
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
                break;
                
            default:
                console.log('Button not found')
        }
    }
    render() {
        return (
            <button className='req-btn' id={this.props.id} onClick={this.handleClick}>{this.props.buttonName}</button>
        )
    }
}

let mapStateToProps = function (state) {
    return {
        userType: state.userType,
        userName: state.userName
    }
}

let ConnectedButton = connect(mapStateToProps)(Button)

export default ConnectedButton