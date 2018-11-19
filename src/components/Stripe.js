import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';




class Stripe extends Component{
  onToken = (token) => {
    fetch('/updaterequeststatus', {
      method: "POST",
      body: JSON.stringify({
          _id: this.props._id,
          status: 3,
          userType: this.props.userType,
          userName: this.props.userName
      })
  }).then(function(x){
      return x.text()
  }).then(response=>{
    this.props.formatResponse(response)
  })
  
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_CuOhEKUY2UlbwUf3tXYMQA6E"
        bitcoin
      />
    )
  }

}

let mapStateToProps = function(state){
  return {
    userName: state.userName,
    userType: state.userType
  }
}

let connectedStripe = connect(mapStateToProps)(Stripe)

export default connectedStripe
