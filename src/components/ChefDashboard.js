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
        this.props.history.push('/addmeal')
    }
    render(){
        return(<>
            <div className="chefInfoTitle"> My Info </div>
            <br/>
            <button  onClick={this.addMeal}>Add a Meal</button>
        </>
        )
    }
}

let ConnectedChefDashboard = connect()(ChefDashboard);
export default ConnectedChefDashboard