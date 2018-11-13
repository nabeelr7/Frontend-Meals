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
        this.setState({file: event.target.files[0]})
    }
    handleBioChange(event) {
        this.setState({bio: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault()
        let formData = new FormData()

        formData.append('userName', this.props.userName)
        formData.append('bio', this.state.bio)
        formData.append('file', this.state.file)

        fetch('/setprofile', {
            method: "POST",
            body: formData
        }).then(function(x){
            return x.text()
        }).then(function(res) {
            let parsed = JSON.parse(res)
            if (parsed.success) {
                console.log("Profile Updated Successfully")
            }
            if (!parsed.success) {
                console.log(parsed.msg)
            }
        })
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


let mapStateToProps = function(state){
    return {
        userName: state.userName
    }
}

let ConnectedSetupProfile = connect(mapStateToProps)(setupProfile)
export default ConnectedSetupProfile