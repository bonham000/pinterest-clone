
import { combineReducers } from 'redux'

import { SAVE_IMAGES, REMOVE_IMAGE } from '../actions/images'

const images = (state = [], action) => {
	
	switch(action.type) {

		case SAVE_IMAGES:
			const newImages = action.images.slice();
			return newImages;

		case REMOVE_IMAGE:
			const slicedImages = [...state.slice(0, action.idx), ...state.slice(action.idx + 1)];
			return slicedImages;

		default:
			return state;

	}

}

export default images;