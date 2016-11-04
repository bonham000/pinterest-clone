import { combineReducers } from 'redux'
import auth from './auth-reducer'
import images from './image-reducer'

export default combineReducers({
  auth,
  images
});
