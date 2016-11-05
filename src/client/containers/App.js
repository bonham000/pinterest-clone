
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navbar from '../components/Navbar'

import { retrieveAllImages } from '../actions/images'
import { logoutUser } from '../actions/logout'

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  dispatch => ({
    loadImages: bindActionCreators(retrieveAllImages, dispatch),
    logoutUser: bindActionCreators(logoutUser, dispatch)
  })
)
class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loadImages: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
  }
  componentWillMount() { this.props.loadImages() }
  render() {
    const { isAuthenticated, logoutUser } = this.props;
    return (
      <div>

        <Navbar isAuthenticated = {isAuthenticated} logoutUser = {logoutUser} />

        {this.props.children}

      </div>
    );
  }
};

export default App;