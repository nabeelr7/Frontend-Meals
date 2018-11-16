import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ArrayToUl from './ArrayToUl';
import MealOrderForm from './MealOrderForm';


class MealDescription extends Component
{   
    constructor(props)
    {
        super(props);

        this.state={
            _id: '',
            title: '',
            description: '',
            price: 0,
            image: '',
            ingredients: [],
            diet: [],
            chefName: ''
        }

        // Bindings
        this.processServerResponse = this.processServerResponse.bind(this);
        this.showMealOrderForm = this.showMealOrderForm.bind(this);
    }

    componentDidUpdate(prevProps)
    {
        if(!prevProps ||
            prevProps.mealId !== this.props.mealId)
        {
            fetch('/getmealdescription', {
                method:"POST",
                credentials: 'include',
                body: JSON.stringify({_id: this.props.mealId})
            })
            .then(function(response){ return response.text()})
            .then(this.processServerResponse)
        }
    }

    processServerResponse(response)
    {
        let parsed = JSON.parse(response);

        this.setState({
            chefName: parsed.userName,
            title: parsed.title,
            description: parsed.description,
            price: parseInt(parsed.price),
            ingredients: parsed.ingredients,
            diet: parsed.diet,
            image: parsed.image

        })
    }

    showMealOrderForm(evt)
    {
        console.log("Someone wants to order a meal. Quick, to the batmobile!");
    }

    render()
    {
        return (<div>
                    <img src={this.state.image} />
                    <div>{this.state.title}</div>
                    <div>{this.state.description}</div>
                    <div>{this.state.price + '$'}</div>
                    <div>ingredients: 
                        <ArrayToUl array={this.state.ingredients} />
                    </div>
                    <div>dietary considerations: 
                        <ArrayToUl array={this.state.diet} />
                    </div>

                    <MealOrderForm />

                    <div>
                        <button onClick={this.showMealOrderForm}>Order this meal</button>
                        <Link to={'/chef/' + this.state.chefName}><button>Chef profile</button></Link>
                    </div>
                </div>
        )
        
    }
}


function mapStateToProps(state)
{
    return {
        loggedIn: state.loggedIn,
        userName: state.userName
    }
}

export default connect(mapStateToProps)(MealDescription);