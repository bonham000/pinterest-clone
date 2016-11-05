import { browserHistory } from 'react-router'

import axios from 'axios'

export const LOGOUT_USER = 'LOGOUT_USER'

function fulfillLogout() {
  return {
    type: LOGOUT_USER,
    isFetching: false,
    isAuthenticated: false,
    user: ''
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(fulfillLogout());
  }
}