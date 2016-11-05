import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { checkAuth } from '../actions/login'

@connect(
	null,
	dispatch => ({
		passport: bindActionCreators(checkAuth, dispatch)
	})
)
class PassportAuth extends React.Component {
	componentWillMount() { this.props.passport() }
	render() {
		return (
			<div />
		);
	}
}

export default PassportAuth;