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
    componentDidMount(){

        fetch('/getprofile', {
            method: "POST",
            body: JSON.stringify({ userName: this.props.userName })
        }).then((x) => x.text())
            .then((response) => {
                let parsed = JSON.parse(response)
                this.setState({ profile: parsed })
            })

        fetch('/getitemsbychef', {
            method: "POST",
            body: JSON.stringify({ userName: this.props.userName })
        }).then((x) => {
            return x.text()
        }).then((response) => {
            let parsed = JSON.parse(response)
            this.setState({ items: parsed })
            console.log(response);
        })
    
        fetch('/getrequests', {
            method: "POST",
            body: JSON.stringify({
                chefName: this.props.userName,
            })
        }).then(function (x){
            return x.text()
        }).then(function(response){
            let parsed = JSON.parse(response)
            if (parsed.success) {
                console.log(parsed.msg)
                //HERE DO STUFF WITH THE REQUESTS!==========
            }
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

                <MealAddBox closeModal={this.closeModal}/>

            </Modal>
        </>
        )
    }
}
let mapStateToProps = function(state){
    return{
        userName: state.userName
    }
}

let ConnectedChefDashboard = connect(mapStateToProps)(ChefDashboard);
export default ConnectedChefDashboard