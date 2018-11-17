import React, { Component } from 'react';
import {connect} from 'react-redux';
import MealCard from './MealCard.js'
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import Modal from 'react-awesome-modal'

class Browse extends Component {
    constructor(){
        super()
        this.state={
            items: [],
            searchType: 'title'
        }

        // bindings
        this.displayMealDescription = this.displayMealDescription.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        // If the user is logged in, we'll pass his coordinates along with the
        // fetch so the server can crunch the distance for us
        let body = {};

        if (this.props.loggedIn)
        {
            body.userCoordinates = this.props.userCoordinates;
        }

        fetch('/getallmeals', {
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(function(x){
            return x.text()
        }).then(function(res){
            let parsed = JSON.parse(res)
            this.setState({items: parsed})
        }.bind(this))
    }

    displayMealDescription(mealId)
    {
        this.setState({
            displayedMealId: mealId,
            visible: true
        })
    }

    closeModal(evt)
    {
        this.setState({
            visible: false
        })
    }

    render(){
        return (
            <div className='browse'>
            <Modal 
                    width="50%"
                    height="500"
                    visible={this.state.visible}
                    effect="fadeInUp"
                    onClickAway={this.closeModal}
                >
                    <MealDescriptionAndOrderForm
                        mealId={this.state.displayedMealId} 
                        closeModal={this.closeModal}/>
                </Modal>
            {this.state.items.map((item)=>{
                return <MealCard 
                _id={item._id}
                title={item.title}
                price={item.price}
                image={item.image}
                displayMeal={this.displayMealDescription}/>
            })}
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates
    }
}

export default connect(mapStateToProps)(Browse);