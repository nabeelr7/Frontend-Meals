import React, { Component } from 'react';
import { connect } from 'react-redux';

class setupProfile extends Component {
    constructor(){
        super()
        this.state={

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleBioChange = this.handleBioChange.bind(this)
    }
    handleFileChange(event) {

    }
    handleBioChange(event) {
        this.setState({bio: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault()
        
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div>Edit your profile</div>
                <div>Let's start with a picture</div>
                <input type='file' onChange={this.handleFileChange}/>
                <div>Please provide a short bio</div>
                <textarea type='text' rows='4' cols='40' onChange={this.handleBioChange}></textarea>
                <input type ='submit'/>
                </form>
            </div>
        )
    }
}




let ConnectedSetupProfile = connect()(setupProfile)
export default ConnectedSetupProfile