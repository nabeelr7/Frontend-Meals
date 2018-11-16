import React, {Component} from 'react';
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

export default MealOrderForm;