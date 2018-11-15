import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import MealAddBox from './MealAddBox'

class ChefDashboard extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }

        //bind everything
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        })
    }

    render() {
        return (<>
            <div className="chefInfoTitle"> My Info </div>
        <input type="button" value="Add A Meal" onClick={() => this.openModal()} />
                <Modal 
                    visible={this.state.visible}
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >

                <MealAddBox />

            </Modal>
        </>
        )
    }
}

let ConnectedChefDashboard = connect()(ChefDashboard);
export default ConnectedChefDashboard