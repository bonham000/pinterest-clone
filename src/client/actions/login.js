import axios from 'axios'
import { browserHistory } from 'react-router'

// There are three possible states for our login process and we need actions for each of them

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

import { DEV_HOST, PROD_HOST } from '../constants/host'
const HOST = DEV_HOST;

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}

export function checkAuth() {
  return dispatch => {
    return axios.post(`${HOST}/verify`).then ( (res) => {
      if (res.status === 201) {

          const user = res.data;

          // If login was successful, set the token in local storage
          localStorage.setItem('user', user.user)
          localStorage.setItem('id_token', user.id_token)

          // Dispatch the success action
          dispatch(receiveLogin(user))

          browserHistory.push('/dashboard');
        }
    }).catch(err => { 
      console.log('You are not authenticated', err.response.data);
      dispatch(loginError(err.response.data));
    });
  }
}