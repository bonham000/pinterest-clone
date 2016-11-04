
import axios from 'axios'

import { browserHistory } from 'react-router'

export function addImage(data) {
	return dispatch => {
		axios.post('/api/add-image', data).then( (response) => {
			dispatch(retrieveAllImages());
		}).catch((err) => {
			alert(err.response.data);
			browserHistory.push('/');
		});
	}
};

export const SAVE_IMAGES = 'SAVE_IMAGES'

function saveImages(images) {
	return {
		type: SAVE_IMAGES,
		images
	}
};

export function removeImage(data) {
	return dispatch => {
		axios.post('/remove-image', data).then( (response) => {
			dispatch(retrieveAllImages());
		}).catch(err => alert(err));
	}
}

export function retrieveAllImages() {
	return dispatch => {
		axios.get('/retrieve-all-images').then( (response) => {
			dispatch(saveImages(response.data));
		}).catch(err => console.log(err));
	}
};