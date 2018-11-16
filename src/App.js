import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import setupProfile from './components/setupProfile';
import './App.css';
import Header from './components/Header.js';
import Bottom from './components/Bottom.js';
import MealAddBox from './components/MealAddBox';
import ChefDashboard from './components/ChefDashboard.js';
import MealDescriptionAndOrderForm from './components/MealDescriptionAndOrderForm';
import Browse from './components/Browse'
import ChefProfile from './components/ChefProfile'
import Homepage from './components/Homepage'

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

      if(parsed.success)
      {
        this.props.dispatch({
          type: "loggedIn",
          userName: parsed.userName,
          userType: parsed.userType
          })
      }
    }.bind(this))
  }

  renderHomePage()
  {
    return <Homepage/>
  }

  render() {
    
      return (
        <BrowserRouter>
          <div className="App">

            <Header />

            

            <Route exact={true} path='/' render={this.renderHomePage} />
            <Route exact={true} path='/signup' component={Signup}/>
            <Route exact={true} path='/login' component={Login}/>
            <Route exact={true} path='/setProfile' component={setupProfile}/>
            <Route exact={true} path='/addmeal' component={MealAddBox}/>
            <Route exact={true} path='/chefdashboard' component={ChefDashboard}/>
            <Route exact={true} path='/meal/:mealId' component={MealDescriptionAndOrderForm} />
            <Route exact={true} path='/browse' component={Browse}/>
            <Route exact={true} path='/chef/:chefName' component={ChefProfile}/>

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
