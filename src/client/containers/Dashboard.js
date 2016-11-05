import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuid from 'uuid-v4'

import { retrieveAllImages, addImage, removeImage } from '../actions/images'
import { logoutUser } from '../actions/logout'

@connect(
	state => ({
		images: state.images,
		user: state.auth.user,
		token: state.auth.id_token
	}),
	dispatch => ({
		dispatchSubmission: bindActionCreators(addImage, dispatch),
		dispatchRemove: bindActionCreators(removeImage, dispatch),
		loadImages: bindActionCreators(retrieveAllImages, dispatch),
		logoutUser: bindActionCreators(logoutUser, dispatch)
	})
)
class Dashboard extends React.Component {
	static propTypes = {
		images: React.PropTypes.array.isRequired,
		user: React.PropTypes.string.isRequired,
		token: React.PropTypes.string.isRequired,
		loadImages: React.PropTypes.func.isRequired,
		dispatchSubmission: React.PropTypes.func.isRequired,
		dispatchRemove: React.PropTypes.func.isRequired
	}
	componentWillMount() {
		if (!this.props.token) { this.props.logoutUser() }
		this.props.loadImages();
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

			this.setState({ input: '' });

			function getImageData(source, user, token, callback) {
				let newImg = new Image();

				newImg.onload = function() {
		    	const imageData = {
			       id: uuid(),
			       author: user,
			       width: newImg.width / 75,
			       height: newImg.height / 75,
			       thumbnailWidth: newImg.width / 75,
			       thumbnailHeight: newImg.height / 75,
			       thumbnail: source,
			       url: source
		     	};

					const data = {
						img: imageData,
						user: user,
						token: token
					}

					callback(data)

				}
				newImg.onerror = () => {
					console.log('error loading image');
				}

				newImg.src = source;

			}

			getImageData(image, this.props.user, this.props.token, this.props.dispatchSubmission);

		}

	}
	removeImage(id, idx) {
		const data = {
			token: this.props.token,
			imageID: id,
			idx
		}
		this.props.dispatchRemove(data);
	}
	handleImageSrcError(err) { err.target.src = 'https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png' }
	render() {
		const { images, user } = this.props;
		const myImages = images.filter( (image) => {
			return image.author === user
		});
		const renderImages = myImages.map( (image, idx) => {
			return <img src = {image.src} onError = {this.handleImageSrcError} key = {image.id} onClick = {this.removeImage.bind(this, image.id, idx)}/>
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
				<h1>Your Images (click to remove)</h1>
				{renderImages}
			</div>
		);
	}
};

export default Dashboard;