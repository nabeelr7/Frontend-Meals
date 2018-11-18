import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';



class App extends Component{
  onToken = (token) => {
    // console.log("hello world") //HERE CHANGE STATUS TO PAYED
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
        
      });
    });
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_CuOhEKUY2UlbwUf3tXYMQA6E"
      />
    )
  }

}
export default App
