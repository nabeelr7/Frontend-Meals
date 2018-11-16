import React, { Component } from 'react';
import { connect } from 'react-redux';
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm'
import Modal from 'react-awesome-modal'
import MealCard from './MealCard.js'



class Homepage extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            visible: false
        }
        this.displayMealDescription = this.displayMealDescription.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    componentDidMount() {
        fetch('/getallmeals')
            .then((x) => x.text())
            .then((response) => {
                let parsed = JSON.parse(response)
                parsed.splice(4)
                this.setState({ items: parsed })
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
        return (
            <div className='featured-container'>
                <div>Featured Meals</div>
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
                            _id={item._id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            displayMeal={this.displayMealDescription} />
                    )
                })}
                </div>
            </div>
        )
    }
}

let ConnectedHomepage = connect()(Homepage)

export default ConnectedHomepage