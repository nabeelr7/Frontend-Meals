import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './Button'

class Requests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            filteredRequests: {}
        }
        this.mapItem = this.mapItem.bind(this)
        this.formatResponse = this.formatResponse.bind(this)
        this.fetchRequests = this.fetchRequests.bind(this)
    }
    formatResponse(response) {
        let parsed = JSON.parse(response)
        if (!parsed.success) {
            this.setState({ foundResults: true })
            return
        }
        this.props.dispatch({ type: "updateRequests", updatedRequests: parsed.result })

        
        if (this.props.allRequests) {
            this.setState({ requests: this.props.allRequests })
        }
        
        let unanswered;
        let accepted;
        let declined;
        let paid;

        if (this.state.requests) {
            unanswered = this.state.requests.filter(item => item.requestStatus === 0)
            accepted = this.state.requests.filter(item => item.requestStatus === 1)
            declined = this.state.requests.filter(item => item.requestStatus === 2)
            paid = this.state.requests.filter(item => item.requestStatus === 3)
            this.setState({
                filteredRequests: {
                    unanswered: unanswered,
                    accepted: accepted,
                    declined: declined,
                    paid: paid
                }
            })
        }
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
                this.formatResponse(response)
            })
    }
    fetchRequests() {
        fetch('/getrequests', {
            method: "POST",
            body: JSON.stringify({
                userName: this.props.userName,
                userType: this.props.userType
            })
        })
            .then(x => x.text())
            .then((response) => {
                this.formatResponse(response)
            })
    }
    mapItem(array) {
        if (array.length < 1) {
            return (<div>None</div>)
        }
        return array.map((item) => {
            if (this.props.userType === 'chef' && item.requestStatus === 0) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <Button buttonName='Accept' _id={item._id} fetchRequests={this.fetchRequests}/>
                        <Button buttonName='Decline' _id={item._id} fetchRequests={this.fetchRequests}/>
                    </div>
                )
            } else if (this.props.userType === 'chef') {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>

                    </div>
                )
            }
            else if (this.props.userType === 'client' && item.requestStatus === 1) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>Chef: {item.chefName}</div>
                        <Button buttonName='Pay Now' _id={item._id} fetchRequests={this.fetchRequests}/>
                    </div>
                )
            } else if (this.props.userType === 'client') {
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
        userType: state.userType,
        allRequests: state.updatedRequests
    }
}

let ConnectedRequests = connect(mapStateToProps)(Requests)

export default ConnectedRequests