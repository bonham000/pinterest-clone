import { combineReducers } from 'redux'

import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/login'
import { LOGOUT_USER } from '../actions/logout'

const defaultState = {
  loginError: '',
  registrationError: '',
  user: '',
  id_token: '',
  isFetching: false,
  isAuthenticated: false
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
  
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        id_token: action.id_token,
        loginError: '',
      });
  
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        loginError: action.error
      });
   
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: '',
        id_token: ''
      });
 
    default:
      return state;

  }
}

export default auth;