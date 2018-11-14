import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Description extends Component
{   
    constructor(props){
        super(props);
        this.state={
            _id: ''
        }
    }
    componentDidMount(){
        if (!this.props._id){
            return(<div>Loading..</div>)
        }else
        fetch('/getMealDescription', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({_id: this.props._id})
        }).then(x=>x.text())
        .then(function(response){
            let parsed = JSON.parse(response);
           this.setState({title: parsed.title,
            description : parsed.description,
            price: parsed.price,
            _id: parsed._iD,
            soldBy: parsed.userName, 
            image: parsed.image,
            ingredients: parsed.ingredients,
            allergens: parsed.allergens
        })
        }.bind(this))

    render()
    {
        return (
                    <img src={this.state.image}></img>

        )
        
    }
}

}
let connectedMealDescription = connect()(MealDescription)
export default connectedMealDescription; 


//title, image, description, ingredients, allergens


//vegan
//vegetarian
//gluten-free
//contains dairy
//contains nuts
// contains shellfish