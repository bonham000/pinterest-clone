import { browserHistory } from 'react-router'

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
    browserHistory.push('/logout');
    browserHistory.push('/');
  }
}