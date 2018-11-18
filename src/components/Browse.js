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
            renderedItems: [],
            itemsAreDirty: true
        }
        // bindings
        this.displayMealDescription = this.displayMealDescription.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.browse = this.browse.bind(this);
    }

    componentDidUpdate(prevProps){
        // Look for changed search results, that means that we're searching and that the results need rendering
        if(!prevProps ||
            prevProps.searchResults !== this.props.searchResults)
        {
            this.setState({
                renderedItems: this.props.searchResults,
                itemsAreDirty: true // we have search items rendered, so dirty items
            });
        }
        else if(!this.props.searching && this.state.itemsAreDirty)
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
            })
            .then(function(res){

                let parsed = JSON.parse(res);

                this.setState({
                    renderedItems: parsed,
                    itemsAreDirty: false
                });

            }.bind(this))    
        }
    }
    

    componentDidMount(){
        // If we're searching, display search results
        if(this.props.searching)
        {
            this.setState({renderedItems: this.props.searchResults});
        }
        else// Otherwise, fetch all meals
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
            })
            .then(function(res){
                let parsed = JSON.parse(res)
                this.setState({
                    renderedItems: parsed,
                    itemsAreDirty: true
                })
            }.bind(this))
        }
    }

    componentWillUnmount()
    {
        // User is probably navigating away from the page, we're no longer searching
        this.props.dispatch({type: 'stopSearching'});
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

    browse(evt)
    {
        // Consider the items to be dirty, and make sure 'this.props.searching' is false
        // this will trigger a fetch in componentDidUpdate
        this.setState({itemsAreDirty: true});
        this.props.dispatch({type: 'stopSearching'});
    }
    
    render(){
        return (
            <div className='browse'>

                <div>
                    <button onClick={this.browse}>Browse Meals</button>
                    <Link to='/browsechefs'> <button >Browse Chefs</button> </Link>
                </div>
                
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

                {this.state.renderedItems.map((item)=>{
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
        searching: state.searching,
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates
    }
}
let connectedBrowse = connect(mapStateToProps)(Browse)
export default connectedBrowse
