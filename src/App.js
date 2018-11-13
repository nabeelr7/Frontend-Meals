import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import setupProfile from './components/setupProfile'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    
      return (
        <BrowserRouter>
          <div className="App">
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
          </div>
        </BrowserRouter>
      )
  }
}


let mapStateToProps = function (state) {
  return {
    username: state.username
  }
}

let ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp;
