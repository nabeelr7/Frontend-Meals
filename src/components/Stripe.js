import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';




class Stripe extends Component{
  onToken = (token) => {
    fetch('/updaterequeststatus', {
      method: "POST",
      body: JSON.stringify({
          _id: this.props._id,
          status: 3
      })
  }).then(function(x){
      return x.text()
  })
  this.props.fetchRequests()
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

let connectedStripe = connect()(Stripe)

export default connectedStripe
