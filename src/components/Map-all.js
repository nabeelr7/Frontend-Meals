import React, {Component} from 'react';
import {connect} from 'react-redux';

import ReactMapGL from 'react-map-gl';

let viewWid = Math.max(window.innerWidth || 0);
let viewHei = Math.max(window.innerHeight || 0);
class Map extends Component {
  constructor(){
    super();
  
  this.state = {
    viewport: {
      width: viewWid,
      height: viewHei,
      latitude: 45.5014,
      longitude: -73.5691,
      zoom: 10
    }
  };
}
adjustView = () => {
  let newViewWid = Math.max(window.innerWidth || 0);
  let newViewHei = Math.max(window.innerHeight || 0);
  this.setState({
    viewport: {
      height: newViewHei,
      width: newViewWid,
      latitude: this.state.viewport.latitude,
      longitude: this.state.viewport.longitude,
      zoom: this.state.viewport.zoom
    }
  });
};

//checks if window size changes to adjust viewport

componentDidMount = () => {
  window.addEventListener("resize", this.adjustView);
};
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