import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ArrayToUl from './ArrayToUl';


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
            userName: ''
        }

        // Bindings
        this.processServerResponse = this.processServerResponse.bind(this);
        this.orderThisMeal = this.orderThisMeal.bind(this);
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
            userName: parsed.userName,
            title: parsed.title,
            description: parsed.description,
            price: parseInt(parsed.price),
            ingredients: parsed.ingredients,
            diet: parsed.allergens,
            image: parsed.image

        })
    }

    orderThisMeal(evt)
    {
        console.log("Someone wants to order a meal. Quick, to the batmobile!");
    }

    render()
    {
        return (<div>
                    <img src={this.state.image} />
                    <div>{this.state.title}</div>
                    <div>{this.state.description}</div>
                    <div>{this.state.Price + '$'}</div>
                    <div>ingredients: 
                        <ArrayToUl array={this.state.ingredients} />
                    </div>
                    <div>dietary considerations: 
                        <ArrayToUl array={this.state.diet} />
                    </div>

                    <div>
                        <button onClick={this.orderThisMeal}>Order this meal</button>
                        <Link to={'/chef/' + this.state.userName}><button>Chef profile</button></Link>
                    </div>
                </div>
        )
        
    }
}


function mapStateToProps(state)
{
    return {

    }
}

export default connect(mapStateToProps)(MealDescription);