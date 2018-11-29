import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import MealAddBox from './MealAddBox';
import Requests from './Requests'
import RemoveButton from './RemoveButton'
import './styling-files/chefProfile.css'

class ChefDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            items: []
        }
        //bindings
        this.updateState = this.updateState.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.displayItems = this.displayItems.bind(this)

    }

    //modal functions
    openModal() { this.setState({ visible: true }) }
    closeModal() { this.setState({ visible: false }) }

    //when a meal is deleted from the database, this function takes the response from the endpoint and updates the users current meals
    updateState(response) {
        this.props.dispatch({
            type: "updateMeals",
            res: response
        })
        this.setState({ items: this.props.updatedMeals })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userName === undefined && this.props.userName) {
            fetch('/getprofile', {
                method: "POST",
                body: JSON.stringify({ userName: this.props.userName })
            }).then((x) => x.text())
                .then((response) => {
                    let parsed = JSON.parse(response)
                    this.setState({ profile: parsed })
                })
        }
        let body = {
            userName: this.props.userName
        }

        if (this.props.loggedIn) {
            body.userCoordinates = this.props.userCoordinates;
        }
        fetch('/getitemsbychef', {
            method: "POST",
            body: JSON.stringify(body)
        }).then((x) => {
            return x.text()
        }).then((response) => {
            let parsed = JSON.parse(response)
            this.setState({ items: parsed })
        })

    }

    componentDidMount() {
        fetch('/getprofile', {
            method: "POST",
            body: JSON.stringify({ userName: this.props.userName })
        }).then((x) => x.text())
            .then((response) => {
                let parsed = JSON.parse(response)
                this.setState({ profile: parsed })
            })

        let body = {
            userName: this.props.userName
        }

        if (this.props.loggedIn) {
            body.userCoordinates = this.props.userCoordinates;
        }

        fetch('/getitemsbychef', {
            method: "POST",
            body: JSON.stringify(body)
        }).then((x) => {
            return x.text()
        }).then((response) => {
            let parsed = JSON.parse(response)
            this.setState({ items: parsed })
        })


    }
    displayItems() {
        if (this.state.items !== []) {
            return (
                this.state.items.map(function (item) {
                    return (
                        <div className='card'>

                            <div className='card-top'>
                                <img src={item.image} className='card-img' height='200px' alt='meal pic' />
                                <div className='card-price'>{item.price}$</div>
                            </div>

                            <div className='card-bottom'>
                                <div className='card-title'>{item.title}</div>
                                <RemoveButton
                                    _id={item._id}
                                    updateState={this.updateState}
                                />
                            </div>

                        </div>
                    )
                }.bind(this))
            )
        }
    }

    render() {
        if (!this.state.profile) { return (<div>loading..</div>) }
        if (this.state.items === []) {
            return (<>

                <input type="button" value="Add A Meal" onClick={() => this.openModal()} />

                <Modal
                    visible={this.state.visible}
                    effect='fadeInUp'
                    onClickAway={() => this.closeModal()}
                >
                    <MealAddBox
                        coordinates={this.state.profile.coordinates}
                        closeModal={this.closeModal} />
                </Modal>

                <div className='chef-main-container'>

                    <div className='chef-profile'>

                        <div className='chef-profile-picture'>
                            <img className='chefProfilePic' height="350px" alt="profilePic" src={this.state.profile.profilePicturePath}></img>
                        </div>

                        <div className='chef-info'>
                            <p className='chef-name'>{this.state.profile.userName}</p>
                            <p className='chef-bio'>Chef Bio:</p>
                            <p>{this.state.profile.bio}</p>
                        </div>

                    </div>

                </div>

            </>
            )
        }
        return (<>
            <Modal
                visible={this.state.visible}
                effect='fadeInUp'
                onClickAway={() => this.closeModal()}
            >
                <MealAddBox
                    coordinates={this.state.profile.coordinates}
                    closeModal={this.closeModal} />
            </Modal>

            <div className='chef-main-container'>

                <div className='chef-profile'>
                    <div className='chef-profile-picture'>
                        <img className='chefProfilePic' height="350px" alt="profilePic" src={this.state.profile.profilePicturePath}></img>
                    </div>
                    <div className='chef-info'>
                        <p className='chef-name'>{this.state.profile.userName}</p>
                        <p className='chef-bio'>Chef Bio:</p>
                        <p>{this.state.profile.bio}</p>
                    </div>
                </div>
                <input type="button" className='addMealBtn' value="Add A Meal" onClick={() => this.openModal()} />

            </div>



            <p className='offering'> Meals I am offering:</p>
    
            <div className='chef-meals-container'>{this.displayItems()}</div>

            <Requests />
        </>
        )
    }
}
let mapStateToProps = function (state) {
    return {
        userName: state.userName,
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates,
        updatedMeals: state.updatedMeals
    }
}

let ConnectedChefDashboard = connect(mapStateToProps)(ChefDashboard);
export default ConnectedChefDashboard