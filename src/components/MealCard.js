import React, { Component } from 'react';
import { connect } from 'react-redux';

class MealCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        // bindings
        this.onBtnClick = this.onBtnClick.bind(this);
    }

    onBtnClick(evt)
    {
        this.props.displayMeal(this.props._id);
    }
    
    render() {
        return (
            <div className='card'>
                <img src={this.props.image} alt='meal img' />
                <div className='card-bottom'>
                    <div>{this.props.title}</div>
                    <div>{this.props.price}</div>
                    <button onClick={this.onBtnClick}>more info</button>
                </div>
            </div>
        )
    }
}

export default MealCard