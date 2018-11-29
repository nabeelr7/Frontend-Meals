import React, {Component} from 'react';
import {connect} from 'react-redux';
import MealDescription from './MealDescription';
import MealOrderForm from './MealOrderForm';



class MealDescriptionAndOrderForm extends Component
{   
    constructor(props)
    {
        super(props);

        this.state={
            ordering: false,
            _id: '',
            title: '',
            description: '',
            price: 0,
            image: '',
            ingredients: [],
            diet: [],
            chefName: ''
        }

        // Bindings
        this.processServerResponse = this.processServerResponse.bind(this);
        this.showOrderForm = this.showOrderForm.bind(this);
        this.hideOrderForm = this.hideOrderForm.bind(this);
    }

    componentDidUpdate(prevProps)
    {
        if(!prevProps ||
            prevProps.mealId !== this.props.mealId)
        {
            let body = {_id: this.props.mealId};
            
            if(this.props.loggedIn) {
                body.userCoordinates = this.props.userCoordinates;
            }

            fetch('/getmealdescription', {
                method:"POST",
                credentials: 'include',
                body: JSON.stringify(body)
            })
            .then(function(response){ return response.text()})
            .then(this.processServerResponse)
        }
    }

    processServerResponse(response)
    {
        let parsed = JSON.parse(response);

        this.setState({
            chefName: parsed.userName,
            title: parsed.title,
            description: parsed.description,
            price: parseInt(parsed.price),
            ingredients: parsed.ingredients,
            diet: parsed.diet,
            image: parsed.image

        })
    }

    showOrderForm()
    {
        this.setState({
            ordering: true
        })
    }

    hideOrderForm()
    {
        this.setState({
            ordering: false
        })
    }

    render()
    {
        return (<div className='modal'>
                        { !this.state.ordering && <MealDescription  
                                                    key="randomKey"
                                                    title={this.state.title}
                                                    description={this.state.description}
                                                    price={this.state.price}
                                                    ingredients={this.state.ingredients}
                                                    diet={this.state.diet}
                                                    image={this.state.image}
                                                    chefName={this.state.chefName}
                                                    showOrderForm={this.showOrderForm}
                                                    />}

                        { this.state.ordering && <MealOrderForm 
                                                    key="makeMeAKey"
                                                    mealId={this.props.mealId}
                                                    chefName={this.state.chefName}
                                                    mealTitle={this.state.title}
                                                    hideOrderForm={this.hideOrderForm}
                                                    closeModal={this.props.closeModal}/>}
        </div>
        )
        /*return (<div>
                    <CSSTransitionReplace
                        transitionName="crossFade"
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}>

                        { !this.state.ordering && <MealDescription  
                                                    key="randomKey"
                                                    title={this.state.title}
                                                    description={this.state.description}
                                                    price={this.state.price}
                                                    ingredients={this.state.ingredients}
                                                    diet={this.state.diet}
                                                    image={this.state.image}
                                                    chefName={this.state.chefName}
                                                    showOrderForm={this.showOrderForm}
                                                    />}

                        { this.state.ordering && <MealOrderForm 
                                                    key="makeMeAKey"
                                                    hideOrderForm={this.hideOrderForm}/>}
          
                    </CSSTransitionReplace>
                </div>) */
    }
}


function mapStateToProps(state)
{
    return {
        loggedIn: state.loggedIn,
        userName: state.userName,
        userCoordinates: state.userCoordinates
    }
}

export default connect(mapStateToProps)(MealDescriptionAndOrderForm);