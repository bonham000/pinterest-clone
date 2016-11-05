import axios from 'axios'
import { browserHistory } from 'react-router'

import { retrieveAllImages } from './images'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

import { DEV_HOST, PROD_HOST } from '../constants/host'
const HOST = DEV_HOST;

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user.user,
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

          // Dispatch the success action with user data from server
          dispatch(receiveLogin(user));

          dispatch(retrieveAllImages());

          browserHistory.push('/dashboard');
        }
    }).catch(err => { 
      console.log('You are not authenticated', err.response.data);
      dispatch(loginError(err.response.data));
      browserHistory.push('/login');
    });
  }
}