import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import MealOrderFrom from './MealOrderForm';
import shortId from 'shortid';
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import MapProfile from './Map-Chef-profile.js';
import './chefProfile.css'

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
                chefName: item.userName,
                mealId: item._id,
                title: item.title
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

        let body = {
            userName: chefName
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
    render() {
        console.log("mapprofile", MapProfile)
        if (!this.state.profile) { return <div>Loading..</div> }
        else {
            return (<div>
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
                <div className='chefLocationMap' style={{textAlign:'start'}}>
                     <MapProfile 
                     profile = {this.state.profile}
                     width={305} 
                     height={300} 
                     mapboxApiAccessToken={'pk.eyJ1IjoiZGF2aWRkZWFuIiwiYSI6ImNqb2tzaG5kcTBqYngzam1veGV4NWJjbnEifQ.DjftYUu4GtL7KOAiBHVd8g'} 
                     latitude={this.state.profile.coordinates.lat} 
                     longitude={this.state.profile.coordinates.lng} 
                     zoom={14}>
                          
                     </MapProfile>
                </div>
                
                <Modal
                    visible={this.state.visible}
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                    
                >
                    <MealDescriptionAndOrderForm
                            mealId={this.state.currentItem.mealId}
                            closeModal={this.closeModal} />
                    
                </Modal>
                </div>
                <div className='meals-offered-announce'>Meals Offered:</div>
                <div className='chef-meals-container' >
                  

                    {this.state.items.map((item) => {
                        return ( 
                            <div key={shortId.generate()} className='card'>
                                <div className='card-top'>
                                     <img src={item.image} className='card-img' height="200px" alt='meal pic' />
                                </div>
                                <div className='card-bottom'>
                                    <div>{item.title}</div>
                                    <div>{item.price}$</div>
                                    <input type="button" value="More info" onClick={() => this.openModal(item)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>)
        }
    }
}

let mapStateToProps = function (state) {
    return {
        userName: state.userName,
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates
    }
}

let ConnectedChefProfile = connect(mapStateToProps)(ChefProfile);
export default ConnectedChefProfile
