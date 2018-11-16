import React, {Component} from 'react';


class MealOrderForm extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            
        }

        // Bindings
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(evt)
    {
        console.log('date selected');
    }

    render()
    {         return (
                        <div>Meal order form</div>
        )
    }
}

export default MealOrderForm;