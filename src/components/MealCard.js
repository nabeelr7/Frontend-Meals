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
            <div className='card-top'>
                <img height='300px' src={this.props.image} alt='meal img' className='card-img'/>
                </div>
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