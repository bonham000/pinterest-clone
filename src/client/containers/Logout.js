import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logoutUser } from '../actions/logout'

@connect(
	null,
	dispatch => ({
		logoutUser: bindActionCreators(logoutUser, dispatch)
	})
)
class Logout extends React.Component {
	componentWillMount() { this.props.logoutUser() }
	render() {
		return (
			<div className = 'logout'>
				<h1>You have been logged out</h1>
			</div>
		);
	}
	componentDidMount() { this.props.logoutUser() }
};

export default Logout;