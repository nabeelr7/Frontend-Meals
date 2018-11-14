import {createStore} from 'redux';

let initialState = {
    loggedIn: false
}

let reducer= function(state, action)
{
    switch(action.type)
    {
        case 'loggedIn':
            return {
                ...state,
                userName: action.userName,
                loggedIn: true,
                userType: action.userType
            }

        case 'loggedOut':
            return {
                ...state,
                userName: '',
                userType: '',
                loggedIn: false
            }

        default:
            return state;
    }
}

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;