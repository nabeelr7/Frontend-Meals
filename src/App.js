import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Authentication from './components/Authentication'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    if (!this.props.username) {
      return (
        <BrowserRouter>
          <div className="App">
            <Authentication />
          </div>
        </BrowserRouter>
      )
    }
  }
}


let mapStateToProps = function (state) {
  return {
    username: state.username
  }
}

let ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp;
