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
                    status: 1
                })
            }).then(function (x) {
                return x.text()
            }).then(function (response) {
                let parsed = JSON.parse(response)
                console.log(parsed)
                this.props.dispatch({ type: "updateRequests", updatedRequests: parsed.result })
                this.props.fetchRequests()
            }.bind(this))
        }
        if (this.props.buttonName === 'Decline') {
            fetch('/updaterequeststatus', {
                method: "POST",
                body: JSON.stringify({
                    _id: this.props._id,
                    status: 2
                })
            }).then(function(x){
                return x.text()
            }).then(function (response) {
                let parsed = JSON.parse(response)
                this.props.dispatch({ type: "updateRequests", updatedRequests: parsed.result })
                this.props.fetchRequests()
            }.bind(this))
        }
    }
    render() {
        return (
            <button onClick={this.handleClick}>{this.props.buttonName}</button>
        )
    }
}


let ConnectedButton = connect()(Button)

export default ConnectedButton