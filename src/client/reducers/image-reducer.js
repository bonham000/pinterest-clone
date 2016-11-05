
import { combineReducers } from 'redux'

import { SAVE_IMAGES, REMOVE_IMAGE } from '../actions/images'

const images = (state = [], action) => {
	
	switch(action.type) {

		case SAVE_IMAGES:
			const newImages = action.images.slice();
			return newImages;

		default:
			return state;

	}

}

export default images;