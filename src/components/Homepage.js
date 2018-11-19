import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortId from 'shortid';
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm'
import Modal from 'react-awesome-modal'
import MealCard from './MealCard.js'
import ChefCard from './ChefCard.js'
import {Link} from 'react-router-dom';



class Homepage extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            chefs: [],
            visible: false
            
        }
        this.displayMealDescription = this.displayMealDescription.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    componentDidMount() {
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
            .then((x) => x.text())
            .then((response) => {
                console.log(response)
                let parsed = JSON.parse(response)
                parsed.splice(4)
                this.setState({ items: parsed })
            })
        fetch('/getallchefs')
        .then((x) => x.text())
            .then((response) => {
                console.log(response)
                let parsed = JSON.parse(response)
                parsed.splice(4)
                this.setState({ chefs: parsed })
            })
    }
    displayMealDescription(mealId) {
        this.setState({
            displayedMealId: mealId,
            visible: true
        })
    }

    closeModal(evt) {
        this.setState({
            visible: false
        })
    }
    render() {
        return (<>
            <div className='featured-container'>
                <div>Featured Meals<Link to='/browse'><div>see more..</div></Link></div>
                <div className='browse'>
                <Modal
                    visible={this.state.visible}
                    effect="fadeInUp"
                    onClickAway={this.closeModal}
                    width='50%'
                >
                    <MealDescriptionAndOrderForm
                        mealId={this.state.displayedMealId}
                        closeModal={this.closeModal} />
                </Modal>
                {this.state.items.map((item) => {
                    return (
                        <MealCard
                            key={shortId.generate()}
                            _id={item._id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            displayMeal={this.displayMealDescription} />
                    )
                })}
                </div>
            </div>
            <div className='featured-chefs-container'>
            <div>Featured Chefs<Link to='/browsechefs'><div>see more..</div></Link></div>
                <div className='browse'>
                {this.state.chefs.map((chef) => {
                    return (<>
                        <ChefCard
                            userName={chef.userName}
                            profilePicturePath={chef.profilePicturePath}
                            />
                            </>
                    )
                })}
                </div>
            
            </div>
            </>
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

let ConnectedHomepage = connect(mapStateToProps)(Homepage)

export default ConnectedHomepage