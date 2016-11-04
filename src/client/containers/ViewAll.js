import React from 'react'
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
	componentWillMount() { this.props.loadImages() }
	render() {
		const { images } = this.props;
		const renderImages = images.map( (image) => {
			return <img src = {image.src} key = {image.id}/>
		});
		return (
			<div>
				<h1>Displaying Images from All Useres</h1>
				{renderImages}
			</div>
		);
	}
};

export default AllImages;