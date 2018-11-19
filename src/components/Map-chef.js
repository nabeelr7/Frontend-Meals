import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";



let viewWid = Math.max(window.innerWidth || 0);
let viewHei = Math.max(window.innerHeight || 0);

class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: '100px',
        height: '100px',
        latitude: 45.5014,
        longitude: -73.5691,
        zoom: 13
      },
      mapLoad: false
    };
  }

  
  
  //renders all stop markers when the map component renders

  renderMarkers = (chef, i) => {
    return (
      <Marker
        key={i}
        longitude={chef.coordinates.lng}
        latitude={chef.coordinates.lat}
        offsetTop={0}
        offsetLeft={0}
      >
      </Marker>
    );
  };
  
  //scales map size to window size

  adjustView = () => {
    let newViewWid = '100px';
    let newViewHei = '100px';
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
        onLoad={()=>{setTimeout(()=>this.setState({ mapLoad: true }), 300);}}
      >
       
        {this.state.mapLoad?this.props.chefs.map(this.renderMarkers):null}
        {this.props.children}
      </MapGL>
    );
  }
}
let mapStateToProps
export default Map;