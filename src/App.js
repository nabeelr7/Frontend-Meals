import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import setupProfile from './components/setupProfile';
import './App.css';
import Header from './components/Header.js';
import Bottom from './components/Bottom.js';

class App extends Component {
  constructor() {
    super()
    this.state = {

    }

    // Bindings 
    this.renderHomePage = this.renderHomePage.bind(this);
  }

  componentDidMount()
  {
    // Try to log in automatically (server checks cookie)
    fetch('/login', {
      method: 'GET',
      credentials: 'include'
    })
    .then(function(response){ return response.text()})
    .then(function(response){

      let parsed = JSON.parse(response);

      this.props.dispatch({
         type: "loggedIn",
         userName: parsed.userName,
         userType: parsed.userType
        })
    }.bind(this))
  }

  renderHomePage()
  {
    return <div>Homepage</div>
  }

  render() {
    
      return (
        <BrowserRouter>
          <div className="App">

            <Header />

            {/* <div className='card'>
            <img className='card-img' alt='meal' src='/rawImages/macaroni.jpg'/>
            <div className='card-bottom'>
            Spaghetti and Meatballs
            </div>
            </div> */}

            <Route exact={true} path='/' render={this.renderHomePage} />
            <Route exact={true} path='/signup' component={Signup}/>
            <Route exact={true} path='/login' component={Login}/>
            <Route exact={true} path='/setProfile' component={setupProfile}/>
            <Bottom/>

          </div>
        </BrowserRouter>
      )
  }
}


let mapStateToProps = function (state) {
  return {
    userName: state.userName
  }
}

let ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp;
