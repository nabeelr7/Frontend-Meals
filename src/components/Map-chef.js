import {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

class Map extends Component {
  render() {
    return (
      <ReactMapGL latitude={37.78} longitude={-122.41} zoom={12}>
        <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
          <img height='25px' src='/rawImages/marker.png'></img>
        </Marker>
      </ReactMapGL>
    );
  }
}