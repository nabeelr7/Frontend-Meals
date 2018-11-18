import React, { Component } from 'react';
import { connect } from 'react-redux';

class Requests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            filteredRequests: {}
        }
        this.mapItem = this.mapItem.bind(this)
    }
    componentDidMount() {
        fetch('/getrequests', {
            method: "POST",
            body: JSON.stringify({
                userName: this.props.userName,
                userType: this.props.userType
            })
        })
            .then(x => x.text())
            .then((response) => {
                let parsed = JSON.parse(response)
                if (!parsed.success) {
                    this.setState({ foundResults: true })
                    return
                }
                this.setState({ requests: parsed.result })
                let unanswered = this.state.requests.filter(item => item.requestStatus === 0)
                let accepted = this.state.requests.filter(item => item.requestStatus === 1)
                let declined = this.state.requests.filter(item => item.requestStatus === 2)
                let paid = this.state.requests.filter(item => item.requestStatus === 3)

                if (this.state.requests) {
                    this.setState({
                        filteredRequests: {
                            unanswered: unanswered,
                            accepted: accepted,
                            declined: declined,
                            paid: paid
                        }
                    })
                }
                console.log(this.state)

            })
    }
    mapItem(array) {
        console.log(array)
        return array.map((item) => {
            if (this.props.userType === 'chef'){
            return (
                <div className='req'>
                    <div>{item.mealTitle}</div>
                    <div>Qty: {item.quantity}</div>
                    <div>For Client {item.userName}</div>
                </div>
            )} else if (this.props.userType === 'client') {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>Chef: {item.chefName}</div>
                    </div>
                )
            }
        })
    }


    render() {
        if (!this.state.requests) { return (<div>Loading...</div>) }
        if (this.state.foundResults) { return (<div>No Orders Made</div>) }
        if (this.props.userType === 'chef' && this.state.filteredRequests) {
            return (
                <div className='req-container'>
                    <div className='unanswered'>
                        <div>Unanswered Requests</div>

                        {this.state.filteredRequests.unanswered && this.mapItem(this.state.filteredRequests.unanswered)}

                    </div>
                    <div className='accepted'>
                        <div>Accepted Requests</div>

                        {this.state.filteredRequests.accepted && this.mapItem(this.state.filteredRequests.accepted)}

                    </div>
                    <div className='paid'>
                        <div>Paid</div>

                        {this.state.filteredRequests.paid && this.mapItem(this.state.filteredRequests.paid)}

                    </div>
                </div>
            )
        }
        if (this.props.userType === 'client' && this.state.requests) {
            return (
                <div className='req-container'>
                    <div>My Orders</div>
                    <div className='unanswered'>
                        <div>Unanswered Requests</div>

                        {this.state.filteredRequests.unanswered && this.mapItem(this.state.filteredRequests.unanswered)}

                    </div>
                    <div className='accepted'>
                        <div>Accepted Requests</div>

                        {this.state.filteredRequests.accepted && this.mapItem(this.state.filteredRequests.accepted)}

                    </div>
                    <div className='paid'>
                        <div>Paid</div>

                        {this.state.filteredRequests.paid && this.mapItem(this.state.filteredRequests.paid)}

                    </div>
                    <div className='declined'>
                        <div>Declined Requests</div>

                        {this.state.filteredRequests.declined && this.mapItem(this.state.filteredRequests.declined)}

                    </div>

                </div>
            )
        }
    }
}

let mapStateToProps = function (state) {
    return {
        userName: state.userName,
        userType: state.userType
    }
}

let ConnectedRequests = connect(mapStateToProps)(Requests)

export default ConnectedRequests