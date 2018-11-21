import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ArrayToDiv from './ArrayToDiv';



    class MealDescription extends Component
{
    constructor(props)
    {
        super(props);

        // Bindings
        this.showMealOrderForm = this.showMealOrderForm.bind(this);
    }

    showMealOrderForm(evt)
    {
        this.props.showOrderForm();
    }

    render()
    {
        return (
            <div>
                    <img height='300px' src={this.props.image} alt='meal visuals' />
                    <div className='modal-name'>{this.props.title}</div>
                    <br/>
                    <div className='modal-cat'> Price of this meal is {this.props.price + '$'}</div>
                    <br/>
                    <div className='modal-cat'>Meal Description</div>
                    <div className='mealDescription'>{this.props.description}</div>
                    <br/>
                    <div className='modal-cat'>Ingredients:</div>
                    <div > 
                        <br/>
                        <ArrayToDiv  array={this.props.ingredients} />
                        
                    </div>
                    <br/>
                    <div className='modal-cat'>Dietary considerations: 
                        <br/>
                        
                        <ArrayToDiv array={this.props.diet} />
                    </div>

                    <div>
                        <button onClick={this.showMealOrderForm}>Order this meal</button>
                        <Link to={'/chef/' + this.props.chefName}><button>Chef profile</button></Link>
                    </div>
                </div>
        );
    }
}

export default connect()(MealDescription);