import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addImage } from '../actions/images'

@connect(
	null,
	dispatch => ({
		dispatchSubmission: bindActionCreators(addImage, dispatch)
	})
)
class Dashboard extends React.Component {
	static propTypes = {
		dispatchSubmission: React.PropTypes.func.isRequired
	}
	constructor() {
		super()
		this.state = {
			input: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitImage = this.submitImage.bind(this);
	}
	handleChange(e) {
		this.setState({
			input: e.target.value
		});
	}
	submitImage() {
		const image = this.state.input;

		if (image !== '') {
			const data = {
				img: image,
				user: localStorage.getItem('user'),
				token: localStorage.getItem('id_token')
			}
			this.props.dispatchSubmission(data);
			
			this.setState({
				input: ''
			});

		}

	}	
	render() {
		return (
			<div className = 'dashboardComponent'>
				<h1>
					Dashboard Class
				</h1>
				<input
					type = 'text'
					placeholder = 'Enter a URL to an image' 
					value = {this.state.input}
					onChange = {this.handleChange} />
				<button onClick = {this.submitImage}>Submit Image</button>
			</div>
		);
	}
};

export default Dashboard;