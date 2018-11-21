import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './Button'
import StripeCheckout from './Stripe.js';
import './requests.css'


class Requests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            filteredRequests: {}
        }
        //bindings
        this.mapItem = this.mapItem.bind(this)
        this.formatResponse = this.formatResponse.bind(this)
    }
    //function to sort request statuses
    formatResponse(response) {
        console.log('the response' , response)
        let parsed = JSON.parse(response)
        if (!parsed.success) {
            this.setState({ foundResults: true })
            return
        }
        //send the new requests to the store so that re-renders can happen automatically when the props is changed
        this.props.dispatch({ type: "updateRequests", updatedRequests: parsed.result })

        // //assign the props to the state
        // this.setState({ requests: this.props.allRequests })


        let unanswered;
        let accepted;
        let declined;
        let paid;
        let inPerson;
        let byCar;

        //filtering based on req stat number. Checks to see that the state exists first
        if (this.props.allRequests) {
            unanswered = this.props.allRequests.filter(item => item.requestStatus === 0)
            accepted = this.props.allRequests.filter(item => item.requestStatus === 1)
            declined = this.props.allRequests.filter(item => item.requestStatus === 2)
            paid = this.props.allRequests.filter(item => item.requestStatus === 3)
            inPerson = this.props.allRequests.filter(item => item.requestStatus === 4)
            byCar = this.props.allRequests.filter(item => item.requestStatus === 5)

            this.setState({
                //makes a new state with filtered reqs
                filteredRequests: {
                    unanswered: unanswered,
                    accepted: accepted,
                    declined: declined,
                    paid: paid,
                    inPerson: inPerson,
                    byCar: byCar
                }
            })
        }
    }
    //fetch all reqs on boot
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
                //send reqs to be formatted
                this.formatResponse(response)
            })
    }

    //function used with Stripe to update status
    closePayment() {
        fetch('/updaterequeststatus', {
            method: "POST",
            body: JSON.stringify({
                _id: this.props._id,
                status: 3,
                userType: this.props.userType,
                userName: this.props.userName
            })
        }).then(function (x) {
            return x.text()
        }).then(function (response) {
            let parsed = JSON.parse(response)
            this.props.dispatch({ type: "updateRequests", updatedRequests: parsed.result })
        }.bind(this))
    }

    //map through reqs coming from state
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
                        <Button buttonName='Accept' _id={item._id}  formatResponse={this.formatResponse}/>
                        <Button buttonName='Decline' _id={item._id}  formatResponse={this.formatResponse}/>
                    </div>
                )
            } 
            else if (this.props.userType === 'chef' && item.requestStatus === 1) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div>Awaiting Reply</div>
                    </div>
                )
            }
            else if (this.props.userType === 'chef' && item.requestStatus === 2) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div> Declined </div>
                    </div>
                )
            }
            else if (this.props.userType === 'chef' && item.requestStatus === 3) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div>Client has Paid! Now we wait to hear if they will pickup in person or send a car</div>
                    </div>
                )
            }
            else if (this.props.userType === 'chef' && item.requestStatus === 4) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div>Client will pick up in person </div>
                    </div>
                )
            }
            else if (this.props.userType === 'chef' && item.requestStatus === 5) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div>Client will send a car</div>
                    </div>
                )
            }
            else if (this.props.userType === 'client'&& item.requestStatus === 0) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>Chef: {item.chefName}</div>
                        <div>Awaiting the Chef's Reply</div> 
                    </div>
                )
            }
            
            else if (this.props.userType === 'client' && item.requestStatus === 1) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>Chef: {item.chefName}</div>
                        <div>The order has been accepted!</div>
                        <StripeCheckout
                            _id={item._id}
                            formatResponse={this.formatResponse}
                        />
                    </div>
                )
            }else  if (this.props.userType === 'client' && item.requestStatus === 2) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div> Request Was Declined, Sorry ! </div>
                    </div>
                )
            }
            else  if (this.props.userType === 'client' && item.requestStatus === 3) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <Button buttonName="Pickup_in_Person" _id={item._id}  formatResponse={this.formatResponse}/>
                        <Button buttonName='Will_Send_a_Car' _id={item._id}  formatResponse={this.formatResponse}/>
                    </div>
                )
            }
            else  if (this.props.userType === 'client' && item.requestStatus === 4) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div> Pickup : In Person</div>
                    </div>
                )
            }
            else  if (this.props.userType === 'client' && item.requestStatus === 5) {
                return (
                    <div className='req'>
                        <div>{item.mealTitle}</div>
                        <div>Qty: {item.quantity}</div>
                        <div>For Client {item.userName}</div>
                        <div> Will Send a Car</div>
                    </div>
                )
            }
            
            
        })
    }


    render() {
        if (!this.props.allRequests) { return (<div>Loading...</div>) }
        if (this.state.foundResults) { return (<div>No Orders Made</div>) }
        if (this.props.userType === 'chef' && this.state.filteredRequests) {
            return (
                
                <div className='req-container'>
                    <div className='request'>
                        <div>Unanswered Requests</div>

                        {this.state.filteredRequests.unanswered && this.mapItem(this.state.filteredRequests.unanswered)}

                    </div>
                    <br/>
                    <div className='request'>
                        <div>Accepted Requests</div>

                        {this.state.filteredRequests.accepted && this.mapItem(this.state.filteredRequests.accepted)}

                    </div>
                    <br></br>
                    <div className='request'>
                        <div>Paid</div>

                        {this.state.filteredRequests.paid && this.mapItem(this.state.filteredRequests.paid)}

                    </div>
                    <br></br>
                    <div className='request'>
                        <div>Pick up in person</div>

                        {this.state.filteredRequests.inPerson && this.mapItem(this.state.filteredRequests.inPerson)}

                    </div>
                    <br></br>
                    <div className='request'>
                        <div>Will Send a Car</div>

                        {this.state.filteredRequests.byCar && this.mapItem(this.state.filteredRequests.byCar)}

                    </div>

                </div>
            )
        }
        if (this.props.userType === 'client' && this.props.allRequests) {
            return (
                <div className='req-container'>
                    <div>My Orders</div>
                    <div className='request'>
                        <div>Unanswered Requests</div>

                        {this.state.filteredRequests.unanswered && this.mapItem(this.state.filteredRequests.unanswered)}

                    </div>
                    <br/>
                    <div className='request'>
                        <div>Accepted Requests</div>

                        {this.state.filteredRequests.accepted && this.mapItem(this.state.filteredRequests.accepted)}

                    </div>
                    <div className='request'>
                        <div>Paid</div>

                        {this.state.filteredRequests.paid && this.mapItem(this.state.filteredRequests.paid)}

                    </div>
                    <div className='request'>
                        <div>Declined Requests</div>

                        {this.state.filteredRequests.declined && this.mapItem(this.state.filteredRequests.declined)}

                    </div>
                    <div className='request'>
                        <div>Personal Pick Up</div>

                        {this.state.filteredRequests.inPerson && this.mapItem(this.state.filteredRequests.inPerson)}

                    </div>
                    <div className='request'>
                        <div>Will Send a Car</div>

                        {this.state.filteredRequests.byCar && this.mapItem(this.state.filteredRequests.byCar)}

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