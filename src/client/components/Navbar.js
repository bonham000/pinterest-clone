import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { logoutUser } from '../actions/logout'

class Navbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
        <div className = "navigationWrapper">
          <div className = "linksWrapper">

            { !isAuthenticated &&
              <Link to = '/' className = 'navLink' activeClassName = 'activeRoute'>Home</Link> }

            { isAuthenticated &&
              <Link to = '/dashboard' className = 'navLink' activeClassName = 'activeRoute'>Dashboard</Link> }

            <Link to = '/view-all' className = 'navLink' activeClassName = 'activeRoute'>All Images</Link>              

            { !isAuthenticated &&
              <a className = "btn btn-block btn-social btn-twitter navLink" id = "twitter-login" href = "/auth/twitter">
                <span className = "fa fa-twitter"></span> Sign in with Twitter
              </a> }

            { isAuthenticated &&
              <Link to = '#' className = 'navLink' onClick = {this.props.logoutUser}>Logout</Link> }              

          </div>
        </div>
    )
  }
}

export default Navbar;