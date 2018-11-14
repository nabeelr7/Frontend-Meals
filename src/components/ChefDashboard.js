import React, { Component } from 'react';
import { connect } from 'react-redux';


class ChefDashboard extends Component{
    constructor(){
        super();
        this.state={}

        //bind everything
        this.addMeal=this.addMeal.bind(this)
    }

    //function of button to add meal items
    addMeal(){
        
    }
    render(){
        <div>
            <div> My Info </div>

            <button value= 'Add Meal' onClick={this.addMeal}></button>
        
        </div>
    }
}

let ConnectedChefDashboard = connect()(ChefDashboard);
export default ConnectedChefDashboard