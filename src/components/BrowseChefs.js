import React, { Component } from 'react';
import MealCard from './MealCard.js'
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import Modal from 'react-awesome-modal'
import ReactMapGL, {Marker} from 'react-map-gl';

class BrowseChefs extends Component {
    constructor(){
        super()
        this.state={
            chefs: [],
            searchType: 'title'
        }

        // bindings
        this.displayChefDescription = this.displayChefDescription.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        fetch('/getallchefs')           //write an endpoint for /getallchefs
        .then(function(x){
            return x.text()
        }).then(function(res){
            let parsed = JSON.parse(res)
            this.setState({chefs: parsed})
        }.bind(this))
    }

    displayChefsDescription(mealId)
    {
        this.setState({
            displayedChef: chefName,
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

export default BrowseChefs