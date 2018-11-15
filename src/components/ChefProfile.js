import React, { Component } from 'react';
import { connect } from 'react-redux';


class ChefProfile extends Component {
    constructor() {
        super();
        this.state = {
            profile: ''
        }
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
            <div className='chefMeals'>
                {this.state.items.map(function(item){
                    return (
                        <div className='item-card'>
                        <img src={item.image} alt='meal pic'/>
                        <div>{item.price}</div>
                        <div>{item.title}</div>
                        <div>{item.description}</div>
                        <ul>{item.diet.map((item)=><li>{item}</li>)}</ul>
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