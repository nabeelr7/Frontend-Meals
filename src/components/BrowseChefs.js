import React, { Component } from 'react';
import Map from './Map-Browse-all-chefs.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styling-files/Browse.css'


class BrowseChefs extends Component {
    constructor() {
        super()
        this.state = {
            chefs: [],
        }
    }

    componentDidMount() {
        // if the user isnt logged in, display all chefs
        if (!this.props.loggedIn) {
            fetch('/getallchefs')
                .then(function (x) {
                    return x.text()
                }).then(function (res) {
                    let parsed = JSON.parse(res)
                    this.setState({ chefs: parsed })
                }.bind(this))
        }
        // if they are logged and they have given their address, send a POST Req to get chefs along with their coordinates
        if (this.props.loggedIn && this.props.userCoordinates) {
            fetch('/getallchefs', {
                method: "POST",
                body: JSON.stringify({ userCoordinates: this.props.userCoordinates })
            }).then(function (x) {
                return x.text()
            }).then(function (res) {
                let parsed = JSON.parse(res)
                console.log(parsed)
                //sort chefs by their distance to the user logged in
                parsed = parsed.sort(function (a, b) { return a.distance - b.distance })
                this.setState({ chefs: parsed })
            }.bind(this))
        }
    }

    render() {
        if (this.state.chefs === []) { return (<div>Loading..</div>) }
        if (!this.props.loggedIn) {
            return (<>
                <div className='btn-box'>
                    <Link to='/browse'><button className='filter-btn'>Browse Meals</button></Link>
                    <Link to='/browsechefs'> <button className='filter-btn'>Browse Chefs</button> </Link>
                </div>
                <div className='chefsLocationMap' style={{ textAlign: 'start' }}>
                    <Map
                        chefs={this.state.chefs}
                        width={600}
                        height={600}
                        mapboxApiAccessToken={'pk.eyJ1IjoiZGF2aWRkZWFuIiwiYSI6ImNqb2tzaG5kcTBqYngzam1veGV4NWJjbnEifQ.DjftYUu4GtL7KOAiBHVd8g'}
                        latitude={45.5014}
                        longitude={-73.5691}
                        zoom={13}
                    >

                    </Map>
                </div>
                <div className='chefProfiles'>
                    {this.state.chefs.map(function (chef) {
                        return (
                            <div className='chefCard'>
                                <div className='card-top'>
                                    <Link to={`/chef/${chef.userName}`}>
                                        <img className='chef-img' src={chef.profilePicturePath} height="200px" alt='chefProfilePic' />
                                    </Link>
                                </div>
                                <div className='card-bottom'>
                                    <div className='chef-card-name'>{chef.userName}  </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </>
            )
        }
        if (this.props.loggedIn && this.props.userCoordinates) {
            //if the user is logged in, the map will be centered on them
            return (<>
                <div className='btn-box'>
                    <Link to='/browse'><button className='filter-btn'>Browse Meals</button></Link>
                    <Link to='/browsechefs'> <button className='filter-btn'>Browse Chefs</button> </Link>
                </div>
                <div className='chefsLocationMap' style={{ textAlign: 'start' }}>
                    <Map
                        chefs={this.state.chefs}
                        width={600}
                        height={600}
                        mapboxApiAccessToken={'pk.eyJ1IjoiZGF2aWRkZWFuIiwiYSI6ImNqb2tzaG5kcTBqYngzam1veGV4NWJjbnEifQ.DjftYUu4GtL7KOAiBHVd8g'}
                        latitude={this.props.userCoordinates.lat}
                        longitude={this.props.userCoordinates.lng}
                        zoom={13}
                    >
                    </Map>
                </div>
                <div className='chefProfiles'>
                    {this.state.chefs.map(function (chef) {
                        return (
                            <div className='chefCard'>
                                <div className='card-top'>
                                    <Link to={`/chef/${chef.userName}`}>
                                        <img className='chef-img' src={chef.profilePicturePath} height="200px" alt='chefProfilePic' />
                                    </Link>
                                </div>
                                <div className='card-bottom'>
                                    <div className='chef-dist'>{chef.userName} is {chef.distance} meters away </div>
                                </div>
                            </div>

                        )
                    })}

                </div>
            </>
            )
        }
    }
}

let mapStateToProps = function (state) {
    return {
        userName: state.userName,
        loggedIn: state.loggedIn,
        userCoordinates: state.userCoordinates
    }
}
let connectedBrowseChefs = connect(mapStateToProps)(BrowseChefs)
export default connectedBrowseChefs