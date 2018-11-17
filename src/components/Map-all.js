import React, {Component} from 'react';
import {connect} from 'react-redux';

import ReactMapGL from 'react-map-gl';


class Map extends Component {
  constructor(){
    super();
  
  this.state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 45.5014,
      longitude: -73.5691,
      zoom: 10
    }
  };
}

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

let ConnectedMap = connect()(Map)
export default ConnectedMap





// <ReactMapGL
//   width={400}
//   height={400}
//   latitude={37.7577}
//   longitude={-122.4376}
//   zoom={8}
//   onViewportChange={(viewport) => {
//     const {width, height, latitude, longitude, zoom} = viewport;
//     // Optionally call `setState` and use the state to update the map.
//   }}
// />