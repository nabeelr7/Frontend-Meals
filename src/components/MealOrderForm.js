import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";


class MealOrderForm extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            chosenDate: moment(),
            quantity: 1,
            orderProcessed: false
        }

        // Bindings
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.processServerResponse = this.processServerResponse.bind(this);
        this.weAreDone = this.weAreDone.bind(this);
    }

    handleDateChange(date)
    {
        this.setState({
            chosenDate: date
        })
    }

    handleQuantityChange(evt)
    {
        this.setState({
            quantity: evt.target.value
        })
    }

    cancel(evt)
    {
        // Depending on the context, we may or may not have this prop defined,
        // so check if it exists before calling
        if (this.props.hideOrderForm) 
        { 
            this.props.hideOrderForm(); 
        }
        else
        {
            this.props.closeModal();
        }
    }

    sendRequest(evt)
    {
        // You have to be logged in to place an order,
        // if not, we send you to the login page... should be clear!
        if (!this.props.loggedIn)
        {
            this.props.history.push('/login');
            return;
        }

        // Otherwise, place the request
        fetch('/placerequest', {
            method: "POST",
            body: JSON.stringify({
                userName: this.props.userName ,
                chefName: this.props.chefName,
                mealId: this.props.mealId ,
                mealTitle: this.props.mealTitle,
                requestStatus: 0,
                dueDate: this.state.chosenDate.toDate(),
                quantity: this.state.quantity
            })
        }).then(function(x){
            return x.text()
        }).then(this.processServerResponse)
    }

    processServerResponse(response)
    {
        let parsed = JSON.parse(response);

        if(parsed.success)
        {
            this.setState({orderProcessed: true})
           
            
        }
    }

    weAreDone(evt)
    {
        // depending on the context (what component is using this one)
        // we may or may not have this property passed to us
        if (this.props.hideOrderForm)
        {
            this.props.hideOrderForm();
        }
        this.props.closeModal();
    }

    render()
    {         return (
                        <div>
                            <DatePicker
                                inline
                                showTimeSelect
                                selected={this.state.chosenDate}
                                onChange={this.handleDateChange}
                            />

                            <div>
                                quantity: <input type='number' onChange={this.handleQuantityChange} value={this.state.quantity}/>
                            </div>

                            <div>
                                {!this.state.orderProcessed &&<>
                                                            <button onClick={this.cancel}>Cancel</button>
                                                            <button onClick={this.sendRequest}>Send request</button>
                                                            </>
                                }

                                {this.state.orderProcessed &&<>
                                                            <p>Thank you for placing your order.</p>
                                                            <button onClick={this.weAreDone}>OK</button>
                                                            </>
                                }
                            </div>

                        </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        userName: state.userName,
        loggedIn: state.loggedIn
    }
}

export default withRouter(connect(mapStateToProps)(MealOrderForm));