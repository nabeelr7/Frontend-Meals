import React, { Component } from "react";
import MapGL, { Marker , Popup} from "react-map-gl";
import {Link} from 'react-router-dom';
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";


let viewWid = Math.max(window.innerWidth || 0);
let viewHei = Math.max(window.innerHeight || 0);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '800px',
        height: '450px',
        latitude: 45.5014,
        longitude: -73.5691,
        zoom: 12
      },

      popupInfo: null,
      mapLoad: false,

    };
    this.renderMarkers=this.renderMarkers.bind(this)
    this.updatePopupInfo=this.updatePopupInfo.bind(this)
    this.closePopup=this.closePopup.bind(this)
  }
  
  renderPopup = () => {
    return (
        this.state.popupInfo && (
          <div className="popupContainer">
            <Popup
              className="popupContent"
              tipSize={5}
              anchor="bottom-right"
              longitude={this.state.popupInfo.coordinates.lng}
              latitude={this.state.popupInfo.coordinates.lat}
              // onClose={()=> this.setState({ popupInfo: null})}
              // closeOnClick={true}
             >
              <Link to={`/chef/${this.state.popupInfo.userName}`}> 
                  <img src = {this.state.popupInfo.profilePicturePath} height='25px' className="popUpText"></img>
                  <div>{this.state.popupInfo.userName}</div>
               </Link>
              
            </Popup>
          </div>
        )
    )
  }

  // get popups info by userName and update popyInfo in the state when it it clicked
  ///HERE AM CAUGHT==========================
  updatePopupInfo = function(x) {

    fetch('/getchef/' + x.target.parentNode.id, {
      method: "GET"
    })
    .then(res => res.json())
    .then(res => {
      this.setState({popupInfo: res});
    }) 
    .catch(err => {
      console.log(err);
    });
  };

  closePopup(){
    setTimeout(()=>this.setState({popupInfo : null}), 500)

  }
  //renders all stop markers when the map component renders

  renderMarkers = function (chef, i) {
    return (
      <Marker
        key={i}
        longitude={chef.coordinates.lng}
        latitude={chef.coordinates.lat}
        offsetTop={0}
        offsetLeft={0}
        cursor= 'pointer'
      >
        <span id={chef.userName} onMouseEnter={this.updatePopupInfo} onMouseLeave={this.closePopup}> 
          <img id={chef.userName} height='25px' alt='locationMarker' src='/rawImages/marker.png'></img>
       </span>
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
        {this.renderPopup()}
        {this.state.mapLoad?this.props.chefs.map(this.renderMarkers):null}
        {this.props.children}
      </MapGL>
    );
  }
}

export default Map;