import React, { Component } from 'react';
import {connect} from 'react-redux';
//import shortId from 'shortid';
import MealCard from './MealCard.js';
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import Modal from 'react-awesome-modal';
import {Link} from 'react-router-dom';

class Browse extends Component {
    constructor(){
        super()

        this.state={
            renderedItems: [],
            itemsToWorkFrom: [],
            itemsAreDirty: true,
            distanceFilter: 40000,
            priceFilter: 50,
            allergenFilter: [],
        }

        // Flag to run appyFilters on componentDidUptade
        this.needToApplyFilters = false;

        // bindings
        this.displayMealDescription = this.displayMealDescription.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.browse = this.browse.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAllergensChange = this.handleAllergensChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    componentDidUpdate(prevProps){
        // Look for changed search results, that means that we're searching and that the results need rendering
        if(!prevProps ||
            prevProps.searchResults !== this.props.searchResults)
        {
            this.setState({
                itemsToWorkFrom: this.props.searchResults,
                renderedItems: this.props.searchResults,
                itemsAreDirty: true // we have search items, so dirty items (not a complete unaltered set)
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
                    itemsToWorkFrom: parsed,
                    renderedItems: parsed,
                    itemsAreDirty: false  // we fetched all the items, a complete clean set
                });

            }.bind(this))    
        }
        else if (this.needToApplyFilters)
        {
            // Reset the flag so we only do this once
            this.needToApplyFilters = false;

            // and apply filters
            this.applyFilters();
        }
    }
    

    componentDidMount(){
        // If we're searching, display search results
        if(this.props.searching)
        {
            this.setState({
                itemsToWorkFrom: this.props.searchResults,
                renderedItems: this.props.searchResults,
                itemsAreDirty: true

            });
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
                    itemsToWorkFrom: parsed,
                    renderedItems: parsed,
                    itemsAreDirty: false
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
        evt.preventDefault();
        evt.stopPropagation();

        // Consider the items to be dirty, and make sure 'this.props.searching' is false
        this.props.dispatch({type: 'stopSearching'});
        this.setState({itemsAreDirty: true});
    }

    handleDistanceChange(evt)
    {
        this.setState({distanceFilter: parseInt(evt.target.value)});
    }

    handlePriceChange(evt)
    {
        this.setState({priceFilter: parseInt(evt.target.value)});
    }

    handleAllergensChange(evt)
    {
        //Put the array of allergens filters together

        if (evt.target.checked)
        {
            this.needToApplyFilters = true;

            this.setState({
                allergenFilter: this.state.allergenFilter.concat(evt.target.name)
            })
        }
        else if (!evt.target.checked)
        {
            let newFilter = this.state.allergenFilter.slice();
            newFilter = newFilter.filter(x=>x !== evt.target.name)

            this.needToApplyFilters = true;

            this.setState({
                allergenFilter: newFilter
            })
        }
    }

    applyFilters(evt)
    {
        // Copy our working set of items (meals)
        let filteredItems = this.state.itemsToWorkFrom.slice();

        // Filter distance
        if (this.props.loggedIn)
        {
            filteredItems = filteredItems.filter((meal)=> parseInt(meal.distance) <= this.state.distanceFilter)
        }

        // Filter price
        filteredItems = filteredItems.filter((meal)=> meal.price <= this.state.priceFilter)

        // Filter allergens
        let tmpArray = [];
        let filter = this.state.allergenFilter;

        for (let i = 0; i < filteredItems.length; i++)
        {
            // If we have nothing to filter, tmpArray is = to filtereItems
            // and don't even bother looping
            if (filter.length === 0)
            {
                tmpArray = filteredItems;
                break;
            }

            let thisMeal = filteredItems[i];
            
            // Check that every filter is present in the meal's diet
            for (let j = 0; j < filter.length; j++)
            {
                // If you didn't find the filter in the diet, break out of the loop and move to another meal
                if (thisMeal.diet.indexOf(filter[j]) === -1)
                {
                    break;
                }

                // Did we reach the end of the filters 
                if (j === filter.length -1)
                {
                    // This meal is kosher, keep it
                    tmpArray.push(thisMeal);
                }
            }
        }

        filteredItems = tmpArray;
        
        // TODO: sort the array according to 'sort-by'

        // Set state for rendered items to the filtered array
        this.setState({renderedItems: filteredItems});
    }
    
    render(){
        return (<>
                <Link to='/browse'><button onClick={this.browse}>Browse Meals</button></Link>
                <Link to='/browsechefs'> <button >Browse Chefs</button> </Link>

                <div className='filterContainer'>
                    {this.props.loggedIn && <div>
                                                <span>Distance</span>
                                                <input type='range'
                                                        step='500'
                                                        min='100' max='40000'
                                                        value={this.state.distanceFilter}
                                                        onChange={this.handleDistanceChange}
                                                        onMouseUp={this.applyFilters}/>
                                                <span>{this.state.distanceFilter} m</span>
                                            </div>
                    }

                    <div>
                        <span>Price</span>
                        <input type='range'
                                step='1'
                                min='1' max='50'
                                value={this.state.priceFilter}
                                onChange={this.handlePriceChange}
                                onMouseUp={this.applyFilters}/>
                        <span>{this.state.priceFilter} $</span>
                    </div>

                    <div>
                        <label><input type='checkbox' name='vegan' onChange={this.handleAllergensChange} /> Vegan</label>
                        <label><input type='checkbox' name='vegetarian' onChange={this.handleAllergensChange} /> Vegetarian</label>
                        <label><input type='checkbox' name='gluten-free' onChange={this.handleAllergensChange} /> Gluten-free</label>
                        <label><input type='checkbox' name='dairy-free' onChange={this.handleAllergensChange} /> Dairy-free</label>
                        <label><input type='checkbox' name='nut-free' onChange={this.handleAllergensChange} /> Nut-free</label>
                        <label><input type='checkbox' name='shellfish-free' onChange={this.handleAllergensChange} /> No Shellfish</label>
                    </div>

                </div>

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

                    {this.state.renderedItems.map((item)=>{
                        return <MealCard 
                            //key={shortId.generate()}
                            _id={item._id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            displayMeal={this.displayMealDescription}/>
                    })}

                </div>
            </>
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
