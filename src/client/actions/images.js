
import axios from 'axios'

import { browserHistory } from 'react-router'

export function addImage(data) {
	return dispatch => {
		axios.post('/api/add-image', data).then( (response) => {
			console.log(response.data);
		}).catch((err) => {
			alert(err.response.data);
			browserHistory.push('/');
		});
	}
}