import React, {Component} from 'react';
import {connect} from 'react-redux';

import MealCard from './MealCard.js'
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import Modal from 'react-awesome-modal'

class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state={
            results:[]
        }
        ;
        this.renderSearchResults=this.renderSearchResults.bind(this)
        this.onSubmit=this.onSubmit.bind(this);
        this.displayMealDescription = this.displayMealDescription.bind(this);
        this.closeModal = this.closeModal.bind(this);
}

componentDidMount(){
    this.setState({results: this.props.searchBarResults})
}
renderSearchResults() {
    return (<>
        {this.state.results.map((item)=>{
        return <MealCard 
        _id={item._id}
        title={item.title}
        price={item.price}
        image={item.image}
        displayMeal={this.displayMealDescription}/>
    })}</>)
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
    if (!this.state.results){
        return (<div>Loading..</div>)
    }
    return(
        <div className='searchResults'>
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
            {this.renderSearchResults}
            </div>
        )

    
    }
}

let  mapStateToProps = function (state){
    return {
        searchBarResults : state.searchBarResults
    }
}

let connectedResults =connect(mapStateToProps)(SearchResults)
export default (connectedResults)