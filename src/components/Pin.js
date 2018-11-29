import React, { Component } from "react";


class Pin extends Component {
  render() {
    return (
      <div id={this.props.id}>
        <img className='pin' src="pin.png" height={this.props.zoom>12?"29vh":this.props.zoom+3+"vh"} width='auto' alt="blue pin"/>
      </div>
    );
  }
}

export default Pin;