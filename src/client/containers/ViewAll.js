import React from 'react'
import Gallery from 'react-grid-gallery';

import ImageLayout from 'react-image-layout';


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { retrieveAllImages } from '../actions/images'

@connect(
	state => ({
		images: state.images
	}),
	dispatch => ({
		loadImages: bindActionCreators(retrieveAllImages, dispatch)
	})
)
class AllImages extends React.Component {
	static propTypes = {
		images: React.PropTypes.array.isRequired,
		loadImages: React.PropTypes.func.isRequired
	}
	componentWillMount() {

		const { images } = this.props;

		let users = {};
		let usersList = ['Select a User', 'Display All Images'];
		function createUsersList(array) {
			return array.filter( (item) => {
				return users.hasOwnProperty(item.author) ? users[item.author].push(item) : users[item.author] = [item];
			});
		};

		createUsersList(images);
		for (let user in users) { usersList.push(user); }

		this.setState({
			usersList: usersList,
			images: images,
			displayImages: images,
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			displayImages: [],
			usersList: []
		}
		this.handleImageSrcError = this.handleImageSrcError.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleImageSrcError(err) { err.target.src = 'https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png' }
	handleSelect(event) {
		// sort images in state based on user selection
		const selection = event.target.value;
		const { images } = this.state;
		if (selection === 'Display All Images') {
			this.setState({
				displayImages: images
			});
		} else if (selection !== 'Select a User') {
			const filterImages = images.filter( (image) => {
				return image.author === selection;
			});
			this.setState({
				displayImages: filterImages
			});
		}
	}
	render() {
		const images = this.state.displayImages.slice();
		return (
			<div className = 'viewAllContainer'>
				<div>
					<h1>Displaying Images from All Useres</h1>
					<h2>Select a user to see just their images</h2>
					<select onChange = {this.handleSelect}>
						{this.state.usersList.map( (user, idx) => { return <option key = {idx} value = {user}>{user}</option>})}
					</select>
				</div>

				<Gallery images = {images} />

			</div>
		);
	}
	componentWillUnmount() {
		console.log('unmounting');
		this.setState({
			images: [],
			displayImages: [],
			usersList: []
		});
	}
};

export default AllImages;











