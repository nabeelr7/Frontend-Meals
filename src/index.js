import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

let reducer= function(state, action){
    if (action.type === "loggedIn"){
        return ({...state, username: action.username, loggedIn: true, userType: action.userType})
    }
    return {...state}
}
const store = createStore(
    reducer,
    {
        loggedIn: false
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
let contents = (<Provider store={store}>
                    <App/>
                </Provider>)

ReactDOM.render(contents, document.getElementById('root'));




serviceWorker.unregister();
