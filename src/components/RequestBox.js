import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class RequestBox extends Component
{







    render()
    {
        return 
        
    }
}


let connectedRequestBox = connect()(RequestBox)
export default connectedRequestBox;




fetch('/placerequest', {
    method: "POST",
    body: JSON.stringify({
        userName: this.props.userName ,
        chefName: this.props.chefName,
        mealId: this.props.mealId ,
        requestStatus: "awaiting_reply"
    })
}).then(function(x){
    return x.text()
}).then(function(response){
    console.log(response)
    let parsed = JSON.parse(response)
    if (parsed.success) {
        console.log(parsed.msg)
    }
})

