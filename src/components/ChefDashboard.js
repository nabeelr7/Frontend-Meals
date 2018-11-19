import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import MealAddBox from './MealAddBox';
import Requests from './Requests'
import RemoveButton from './RemoveButton'

class ChefDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            items: []
        }
        this.updateState=this.updateState.bind(this)
        this.openModal=this.openModal.bind(this)
        this.closeModal=this.closeModal.bind(this)
        this.displayItems=this.displayItems.bind(this)
        
    }

    openModal(){this.setState({ visible: true })}
    closeModal() {this.setState({ visible : false })}

    updateState(response){
        this.props.dispatch({
            type: "updateMeals", 
            res: response
        })
        this.setState({items:this.props.updatedMeals})

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
        })
    
        
    }
    displayItems(){
        if (this.state.items!==[]){return(
        this.state.items.map(function(item) {
            return (
                // key={shortId.generate()}
                <div  className='my-item'>
                    <img src={item.image} height="100px" alt='meal pic' />
                    <div>{item.price}</div>
                    <div>{item.title}</div>
                    <div>{item.description}</div>
                    {console.log(item)}
                    <RemoveButton
                        _id={item._id}
                        updateState={this.updateState}
                        />
                </div>
            )
        }.bind(this))
        )}}
    
    render() {
        if (!this.state.profile){return (<div>loading..</div>)}
        if (this.state.items===[]){
            return (<>
                <input type="button" value="Add A Meal" onClick={() => this.openModal()} />
             <Modal
                visible={this.state.visible}
                effect='fadeInUp'
                onClickAway={() => this.closeModal()}
                >
                <MealAddBox
                    coordinates={this.state.profile.coordinates}
                    closeModal = {this.closeModal}/>
            </Modal>  

            <div className="chefInfoTitle"> My Info </div>
            <img height='200px' alt='profilePic' src={this.state.profile.profilePicturePath}></img>
            <div>{this.state.profile.userName}</div>
            <div>{this.state.profile.bio}</div>
            </>
            )}
         return (<>
            <input type="button" value="Add A Meal" onClick={() => this.openModal()} />
             <Modal
                visible={this.state.visible}
                effect='fadeInUp'
                onClickAway={() => this.closeModal()}
                >
                <MealAddBox
                    coordinates={this.state.profile.coordinates}
                    closeModal = {this.closeModal}/>
            </Modal>  

            <div className="chefInfoTitle"> My Info </div>
            <img height='200px' alt='profilePic' src={this.state.profile.profilePicturePath}></img>
            <div>{this.state.profile.userName}</div>
            <div>{this.state.profile.bio}</div>

         
            
            <div> Meals I am offering:</div>
            <br/>
            {this.displayItems()}
            <Requests/>      
        </>
        )
    }
}
let mapStateToProps = function(state){
    return{
        userName: state.userName,
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates,
        updatedMeals: state.updatedMeals
    }
}

let ConnectedChefDashboard = connect(mapStateToProps)(ChefDashboard);
export default ConnectedChefDashboard