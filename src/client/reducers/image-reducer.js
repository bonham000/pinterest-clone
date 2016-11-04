
import { combineReducers } from 'redux'

import { SAVE_IMAGES } from '../actions/images'

const images = (state = [], action) => {
	
	switch(action.type) {

		case SAVE_IMAGES:
			return action.images;

		default:
			return state;

	}

}

export default images;