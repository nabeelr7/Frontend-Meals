import React, { Component } from 'react';
import MealCard from './MealCard.js'
import MealDescriptionAndOrderForm from './MealDescriptionAndOrderForm';
import Modal from 'react-awesome-modal'
import ReactMapGL, {Marker} from 'react-map-gl';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class BrowseChefs extends Component {
    constructor(){
        super()
        this.state={
            chefs: [],
           
        }

        // bindings
        // this.displayChefDescription = this.displayChefDescription.bind(this);
        
    }
    componentDidMount(){
        fetch('/getallchefs')                           
        .then(function(x){
            return x.text()
        }).then(function(res){
            let parsed = JSON.parse(res)
            this.setState({chefs: parsed})
        }.bind(this))
    }


    render(){
        if (this.state.chefs===[]){return (<div>Loading..</div>)}
        return (<>
        <Link to='/browse'><button >Browse Meals</button></Link>
           <Link to='/browsechefs'> <button >Browse Chefs</button> </Link>
            <div className='chefsLocationMap' style={{textAlign:'start'}}>
                     <ReactMapGL width={600} height={600} mapboxApiAccessToken={'pk.eyJ1IjoiZGF2aWRkZWFuIiwiYSI6ImNqb2tzaG5kcTBqYngzam1veGV4NWJjbnEifQ.DjftYUu4GtL7KOAiBHVd8g'} 
                     latitude={45.5014} 
                     longitude={-73.5691} zoom={14}>

                    {this.state.chefs.map((item)=>{
                        return <Marker 
                                    latitude={item.coordinates.lat}
                                    longitude= {item.coordinates.lng}
                                    offsetLeft={-20} offsetTop={-10}>
                                    <img height='25px' alt='locationMarker' src='/rawImages/marker.png'></img>
                                </Marker>
                        })}
                    
                     </ReactMapGL>
                </div>
            {/* <div className='browseChefsDetails'>
                {this.state.chefs.map(item){
                    return (
                        
                    )
                }}
            
            
            </div> */}
        </>
        )
    }
}
let mapStateToProps = function(state){
    return {
        userName : state.userName
    }
}
let connectedBrowseChefs = connect(mapStateToProps)(BrowseChefs)
export default connectedBrowseChefs