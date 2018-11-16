import React, {Component} from 'react';
import {connect} from 'react-redux';

class MealDescription extends Component
{
    render()
    {
        return <div>Meal description</div>;
    }
}

export default connect()(MealDescription);