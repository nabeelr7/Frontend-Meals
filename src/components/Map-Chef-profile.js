import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";



let viewWid = Math.max(window.innerWidth || 0);
let viewHei = Math.max(window.innerHeight || 0);

class MapProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '600px',
        height: '350px',
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: 13
      },
      mapLoad: false
    };
  }

  //renders all stop markers when the map component renders

  renderMarkers = () => {
    return (
      <Marker
        
        longitude={this.props.profile.coordinates.lng}
        latitude={this.props.profile.coordinates.lat}
        offsetTop={0}
        offsetLeft={0}
      >
      <img height='25px' alt='locationMarker' src='/rawImages/marker.png'></img>
      </Marker>
    );
  };
  
  //scales map size to window size

  adjustView = () => {
    let newViewWid = '600px';
    let newViewHei = '350px';
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
      <MapGL
    
        {...this.state.viewport}
        style={{margin:'0 auto'}}
        mapStyle="mapbox://styles/daviddean/cjooubaoo49mu2ss2oh41pq8r"
        mapboxApiAccessToken='pk.eyJ1IjoiZGF2aWRkZWFuIiwiYSI6ImNqb2tzaG5kcTBqYngzam1veGV4NWJjbnEifQ.DjftYUu4GtL7KOAiBHVd8g'
        onViewportChange={viewport => {
          this.setState({ viewport });
        }}
        onLoad={()=>{setTimeout(()=>this.setState({ mapLoad: true }), 250);}}
      >
       
        {this.state.mapLoad?this.renderMarkers():null}
        {this.props.children}
      </MapGL>
    );
  }
}

export default MapProfile;




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