import React, { Component } from 'react';


class MealCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        // bindings
        this.onBtnClick = this.onBtnClick.bind(this);
    }

    onBtnClick(evt) {
        this.props.displayMeal(this.props._id);
    }

    render() {
        return (
            <div className='card'>
                <div className='card-top'>
                    <img height='300px' src={this.props.image} alt='meal img' className='card-img' />
                        <div className='card-price'>{this.props.price}$</div>
                </div>
                <div className='card-bottom'>
                    <div className='card-info'>
                        <div className='card-title'>{this.props.title}</div>
                        <button className='card-btn' onClick={this.onBtnClick}>more info</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MealCard