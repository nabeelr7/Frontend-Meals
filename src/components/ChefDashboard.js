import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import MealAddBox from './MealAddBox';
import Requests from './Requests'

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

    componentDidUpdate(prevProps){
        if(prevProps.userName === undefined && this.props.userName){
            fetch('/getprofile', {
                method: "POST",
                body: JSON.stringify({ userName: this.props.userName })
            }).then((x) => x.text())
                .then((response) => {
                    let parsed = JSON.parse(response)
                    this.setState({ profile: parsed })
                })
        }
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

        let body = {
            userName: this.props.userName
        }

        if (this.props.loggedIn){
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
        if (!this.state.profile){return (<div>loading..</div>)}
        return (<>
            <div className="chefInfoTitle"> My Info </div>
            <img height='200px' alt='profilePic' src={this.state.profile.profilePicturePath}></img>
            <div>{this.state.profile.userName}</div>
            <div>{this.state.profile.bio}</div>

        <input type="button" value="Add A Meal" onClick={() => this.openModal()} />
                <Modal 
                    visible={this.state.visible}
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >

                <MealAddBox 
                    coordinates={this.state.profile.coordinates}
                    closeModal={this.closeModal}/>

            </Modal>
        <Requests/>            
        </>
        )
    }
}
let mapStateToProps = function(state){
    return{
        userName: state.userName,
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates
    }
}

let ConnectedChefDashboard = connect(mapStateToProps)(ChefDashboard);
export default ConnectedChefDashboard