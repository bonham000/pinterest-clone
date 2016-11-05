import React from 'react'
import Gallery from 'react-grid-gallery';



import ImageLayout from 'react-image-layout';
import ImageGrid from 'react-image-grid'

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

		let grid = [];

			async function setImageData(img) {
		    let newImg = new Image();

		    newImg.onload = await function() {
		    	const gridImage = {
			       width: newImg.width / 75,
			       height: newImg.height / 75,
			       thumbnailWidth: newImg.width / 75,
			       thumbnailHeight: newImg.height / 75,
			       thumbnail: img.src,
			       src: img.src,
			       id: img.id
		     	};
		      grid.push(gridImage);
		    }
		    newImg.src = img.src;
		}

		let { images } = this.props;

		for (let i = 0; i < images.length; i++) { setImageData(images[i]) }
		
		this.setState({
			images: grid,
			displayImages: grid,
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
		const images = this.state.displayImages;
		// const renderImages = images.map( (image, idx) => {
		// 	return <img id = {image.id} src = {image.src} onError = {this.handleImageSrcError} />
		// });
		return (
			<div>
				<div>
					<h1>Displaying Images from All Useres</h1>
					<h2>Select a user to see just their images</h2>
					<select onChange = {this.handleSelect}>
						{this.state.usersList.map( (user, idx) => { return <option key = {idx} value = {user}>{user}</option>})}
					</select>
				</div>

				<Gallery images = {images}></Gallery>

			</div>
		);
	}
	componentDidMount() {
		const { images } = this.state;
		// users object holds keys for each user and their images which is
		// stored in local state when the component is first mounted
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
			usersList: usersList
		});
	}
};

export default AllImages;













