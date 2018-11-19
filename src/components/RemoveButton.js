import React, { Component } from 'react';
import { connect } from 'react-redux';


class RemoveButton extends Component{
    constructor(props){
        super(props);
        this.state={}
        this.removeMeal=this.removeMeal.bind(this)
    }

removeMeal(){
        let body={
            _id : this.props._id,
            userName : this.props.userName}
        console.log (body)
        fetch('/removemeal', {
            method: "POST",
            body: JSON.stringify(body)
        }).then((x) => x.text())
        .then((response) => {
            let parsed = JSON.parse(response)

            if (parsed.success){
                fetch('/getitemsbychef', {
                    method: 'POST',
                    body: JSON.stringify({userName : this.props.userName})
                }).then((x) => x.text())
                .then((response) => {
                    let parsed = JSON.parse(response)   
                    this.props.updateState(response)
                    
                    
                })
             }}
        )}

render(){
return(<>
    <input type="button" value="Remove this Meal" onClick={this.removeMeal}/>
    </>)
}
}

let mapStateToProps = function(state){
    return({
        userName: state.userName
    }
    )
}
let ConnectedRemoveButton = connect (mapStateToProps)(RemoveButton)
export default ConnectedRemoveButton