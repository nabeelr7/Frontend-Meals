import React, { Component } from 'react';
import {connect} from 'react-redux';
import shortId from 'shortid';
import MealCard from './MealCard.js';
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import Modal from 'react-awesome-modal';
import {Link} from 'react-router-dom';

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

    componentDidUpdate(prevProps){
        if(!prevProps ||
            prevProps.searchResults !== this.props.searchResults){
                this.setState({items: this.props.searchResults})
            }
        else
        {
            // If the user is logged in, we'll pass his coordinates along with the
            // fetch so the server can crunch the distance for us
            let body = {};

            if (this.props.loggedIn)
            {
                body.userCoordinates = this.props.userCoordinates;
            }
            
            fetch('/getallmeals',{
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
    }
    

    componentDidMount(){
        if(this.props.searchResults){
            this.setState({items: this.props.searchResults})
        }
        else
        {fetch('/getallmeals')
        .then(function(x){
            return x.text()
        }).then(function(res){
            let parsed = JSON.parse(res)
            this.setState({items: parsed})
        }.bind(this))
        }
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
    browseMealsButton(){
        
    }
    browseChefsButton(){}
    
    render(){
        return (
            <div className='browse'>

            <Link to='/browse'><button onClick={this.browseChefsButton}>Browse Meals</button></Link>
           <Link to='/browsechefs'> <button >Browse Chefs</button> </Link>
            

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
                key={shortId.generate()}
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

let mapStateToProps = function(state){
    return{
        searchResults: state.searchBarResults,
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates
    }
}
let connectedBrowse = connect(mapStateToProps)(Browse)
export default connectedBrowse
