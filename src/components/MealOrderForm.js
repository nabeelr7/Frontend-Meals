import React, {Component} from 'react';
import {connect} from 'react-redux';
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
            quantity: 1
        }

        // Bindings
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.processServerResponse = this.processServerResponse.bind(this);
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
        this.props.hideOrderForm();
    }

    sendRequest(evt)
    {
        fetch('/placerequest', {
            method: "POST",
            body: JSON.stringify({
                userName: this.props.userName ,
                chefName: this.props.chefName,
                mealId: this.props.mealId ,
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
            alert('request placed successfully!');

            this.props.hideOrderForm();
            this.props.closeModal();
        }
    }

    render()
    {         return (
                        <div>
                            <DatePicker
                                inline
                                selected={this.state.chosenDate}
                                onChange={this.handleDateChange}
                            />

                            <div>
                                quantity: <input type='number' onChange={this.handleQuantityChange} value={this.state.quantity}/>
                            </div>

                            <div>
                                <button onClick={this.cancel}>Cancel</button>
                                <button onClick={this.sendRequest}>Send request</button>
                            </div>

                        </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        userName: state.userName
    }
}

export default connect(mapStateToProps)(MealOrderForm);