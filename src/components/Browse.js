import React, { Component } from 'react';
import {connect} from 'react-redux';
//import shortId from 'shortid';
import MealCard from './MealCard.js';
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import Modal from 'react-awesome-modal';
import {Link} from 'react-router-dom';
import './Browse.css'

class Browse extends Component {
    constructor(props){
        super(props)

        // References to our uncontrolled checkboxes and our select box
        this.checkRef1 = React.createRef();
        this.checkRef2 = React.createRef();
        this.checkRef3 = React.createRef();
        this.checkRef4 = React.createRef();
        this.checkRef5 = React.createRef();
        this.checkRef6 = React.createRef();

        this.selectRef = React.createRef();

        this.state={
            renderedItems: [],
            itemsToWorkFrom: [],
            itemsAreDirty: true,
            distanceFilter: 40000,
            priceFilter: 15,
            allergenFilter: []
        }

        // Flag to run appyFilters on componentDidUptade
        this.needToApplyFilters = false;

        // Handle sortby outside of state so we don't have to deal with setState, update, rerender
        // We want to be able to sort right away
        this.sortBy = '';

        // bindings
        this.displayMealDescription = this.displayMealDescription.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.browse = this.browse.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAllergensChange = this.handleAllergensChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    componentDidUpdate(prevProps){
        // Look for changed search results, that means that we're searching and that the results need rendering
        if(!prevProps ||
            prevProps.searchResults !== this.props.searchResults)
        {
            // clear 'this.needToApplyFilters' and this.sortBy
            this.needToApplyFilters = false;
            this.sortBy = '';

            // Uncheck checkboxes and select box
            this.checkRef1.current.checked = false;
            this.checkRef2.current.checked = false;
            this.checkRef3.current.checked = false;
            this.checkRef4.current.checked = false;
            this.checkRef5.current.checked = false;
            this.checkRef6.current.checked = false;

            if(this.props.loggedIn)
            {
                this.selectRef.current.selectedIndex = 0;
            }

            // set the new items and reset filter values
            this.setState({
                itemsToWorkFrom: this.props.searchResults,
                renderedItems: this.props.searchResults,
                itemsAreDirty: true, // we have search items, so dirty items (not a complete unaltered set)
                distanceFilter: 40000,
                priceFilter: 15,
                allergenFilter: []
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

        // make sure 'this.props.searching' is false
        this.props.dispatch({type: 'stopSearching'});

        // Reset our apply filter flag and our sortBy
        this.needToApplyFilters = false;
        this.sortBy = ''

        // Uncheck every checkbox and reset the select box
        this.checkRef1.current.checked = false;
        this.checkRef2.current.checked = false;
        this.checkRef3.current.checked = false;
        this.checkRef4.current.checked = false;
        this.checkRef5.current.checked = false;
        this.checkRef6.current.checked = false;

        if(this.props.loggedIn)
        {
            this.selectRef.current.selectedIndex = 0;
        }
        
        // reset the state
        this.setState({
            itemsAreDirty: true,
            distanceFilter: 40000,
            priceFilter: 15,
            allergenFilter: []
        });
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

    handleSortChange(evt)
    {
        this.sortBy = evt.target.value;

        // Sort
        let sorted = this.sort(this.state.renderedItems);

        // Set state to sorted array
        this.setState({renderedItems: sorted})
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
        
        // sort the array (if logged in)
        if (this.props.loggedIn)
        {
            filteredItems = this.sort(filteredItems);
        }

        // Set state for rendered items to the filtered array
        this.setState({renderedItems: filteredItems});
    }

    /** returns a copy of the passed array sorted according to 'this.sortBy' */
    sort(arrayToSort)
    {
        let sorted = arrayToSort.slice();

        sorted.sort(function(a, b){
            
            switch(this.sortBy)
            {
                case 'price':
                    if (a.price < b.price) return -1;
                    if (a.price > b.price) return 1;
                    if (a.price === b.price) return 0;

                case 'distance':
                    let distanceA = parseInt(a.distance);
                    let distanceB = parseInt(b.distance);

                    if (distanceA < distanceB) return -1;
                    if (distanceA > distanceB) return 1;
                    if (distanceA === distanceB) return 0;

                default:
                    return 0;// happens when sortBy is ""
            }
        }.bind(this))

        
        return sorted;
    }
    
    render(){
        return (<>
        <div className='filter-btn-container'>
                <Link to='/browse'><button className='filter-btn' onClick={this.browse}>Show all Meals</button></Link>
                <Link to='/browsechefs'> <button className='filter-btn' >Browse Chefs</button> </Link>
                </div>
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

                    <div className='price-filter'>
                        <span>Price</span>
                        <input type='range'
                                step='1'
                                min='1' max='15'
                                value={this.state.priceFilter}
                                onChange={this.handlePriceChange}
                                onMouseUp={this.applyFilters}/>
                        <span>{this.state.priceFilter} $</span>
                    </div>

                    <div className='filter-checkbox-container'>
                        <label><input type='checkbox' ref={this.checkRef1} name='vegan' onChange={this.handleAllergensChange} /> Vegan</label>
                        <label><input type='checkbox' ref={this.checkRef2} name='vegetarian' onChange={this.handleAllergensChange} /> Vegetarian</label>
                        <label><input type='checkbox' ref={this.checkRef3} name='gluten-free' onChange={this.handleAllergensChange} /> Gluten-free</label>
                        <label><input type='checkbox' ref={this.checkRef4} name='dairy-free' onChange={this.handleAllergensChange} /> Dairy-free</label>
                        <label><input type='checkbox' ref={this.checkRef5} name='nut-free' onChange={this.handleAllergensChange} /> Nut-free</label>
                        <label><input type='checkbox' ref={this.checkRef6} name='shellfish-free' onChange={this.handleAllergensChange} /> No Shellfish</label>
                    </div>

                    {this.props.loggedIn &&
                                        <div className='filter-checkbox-container'>
                                            <label>Sort by: </label>
                                            <select ref={this.selectRef} onChange={this.handleSortChange}>
                                                <option disabled selected value='' style={{display: 'none'}}> -- select an option -- </option>
                                                <option value='price'>price</option>
                                                <option value='distance'>distance</option>
                                            </select>
                                        </div>
                    }

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
