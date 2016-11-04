import { combineReducers } from 'redux'

import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/login'
import { LOGOUT_SUCCESS } from '../actions/logout'

const defaultState = {
  loginError: '',
  registrationError: '',
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
  
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        loginError: '',
        registrationError: ''
      });
  
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        loginError: action.error
      });
   
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
 
    default:
      return state;

  }
}

export default auth;