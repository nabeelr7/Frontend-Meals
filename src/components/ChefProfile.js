import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import MealOrderFrom from './MealOrderForm'

class ChefProfile extends Component {
    constructor() {
        super();
        this.state = {
            profile: '',
            items: [],
            currentItem: {}
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    openModal(item) {
        this.setState({
            currentItem: {
                userName: item.userName,
                chefName: item.chefName,
                mealId: item.mealId
            },
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        })
    }
    componentDidMount() {
        let chefName = this.props.match.params.chefName
        fetch('/getprofile', {
            method: "POST",
            body: JSON.stringify({ userName: chefName })
        }).then((x) => x.text())
            .then((response) => {
                let parsed = JSON.parse(response)
                this.setState({ profile: parsed })
            })

        fetch('/getitemsbychef', {
            method: "POST",
            body: JSON.stringify({ userName: chefName })
        }).then((x) => {
            return x.text()
        }).then((response) => {
            let parsed = JSON.parse(response)
            this.setState({ items: parsed })
            console.log(response);
        })
    }
    render() {
        if (!this.state.profile) { return <div>Loading..</div> }
        else {
            return (<>
                <div className='chefInfo'>
                    <img className='chefProfilePic' alt="profilePic" src={this.state.profile.image}></img>
                    <div>{this.state.profile.userName}</div>
                    <br />
                    <div>{this.state.profile.bio}</div>
                </div>
                <Modal
                    visible={this.state.visible}
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >

                    <MealOrderFrom
                        closeModal={this.closeModal}
                        userName={this.state.currentItem.userName}
                        chefName={this.state.currentItem.chefName}
                        mealId={this.state.currentItem.mealId}
                    />

                </Modal>
                <div className='chefMeals'>
                    {this.state.items.map((item) => {
                        return (
                            <div className='item-card'>
                                <img src={item.image} alt='meal pic' />
                                <div>{item.price}</div>
                                <div>{item.title}</div>
                                <div>{item.description}</div>
                                <ul>{item.diet.map((item) => <li>{item}</li>)}</ul>
                                <input type="button" value="Order" onClick={() => this.openModal(item)} />
                            </div>
                        )
                    })}
                </div>
            </>
            )
        }
    }
}

let mapStateToProps = function (state) {
    return {
        userName: state.userName
    }
}

let ConnectedChefProfile = connect(mapStateToProps)(ChefProfile);
export default ConnectedChefProfile
