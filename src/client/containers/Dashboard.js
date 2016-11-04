import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addImage, removeImage } from '../actions/images'

@connect(
	state => ({
		images: state.images,
		user: state.auth.user
	}),
	dispatch => ({
		dispatchSubmission: bindActionCreators(addImage, dispatch),
		dispatchRemove: bindActionCreators(removeImage, dispatch)
	})
)
class Dashboard extends React.Component {
	static propTypes = {
		images: React.PropTypes.array.isRequired,
		user: React.PropTypes.string.isRequired,
		dispatchSubmission: React.PropTypes.func.isRequired,
		dispatchRemove: React.PropTypes.func.isRequired
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
	removeImage(id) {
		const data = {
			token: localStorage.getItem('id_token'),
			imageID: id
		}
		this.props.dispatchRemove(data);
	}
	render() {
		const { images, user } = this.props;
		const myImages = images.filter( (image) => {
			return image.author === user
		});
		const renderImages = myImages.map( (image) => {
			return <img src = {image.src} key = {image.id} onClick = {this.removeImage.bind(this, image.id)}/>
		});
		return (
			<div className = 'dashboardComponent'>
				<h1>Welcome {localStorage.getItem('user')}</h1>
				<input
					type = 'text'
					placeholder = 'Enter a URL to an image' 
					value = {this.state.input}
					onChange = {this.handleChange} />
				<button onClick = {this.submitImage}>Submit Image</button>
				<h1>Your Images:</h1>
				{renderImages}
			</div>
		);
	}
};

export default Dashboard;