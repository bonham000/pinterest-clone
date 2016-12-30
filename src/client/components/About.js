import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

@connect(
	state => ({
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user
	})
)
class About extends React.Component {
	static propTypes = {
		isAuthenticated: React.PropTypes.bool.isRequired,
		user: React.PropTypes.string.isRequired
	}
	constructor(props) {
    super(props);
  }
 	render() {
 		return (
		  <div className = 'aboutWrapper'>

		    <h1>Welcome to <b>Pictur</b></h1>

		    { !this.props.isAuthenticated &&
		    	<div>
		    		<p className='about-title'>This full stack JavaScript app lets you link to images and view images from other users. Please login to add new images.</p>
						<a className='source' target = "_blank" href = "https://github.com/bonham000/pinterest-clone">View the source on GitHub</a>
		    	</div> }

				{ this.props.isAuthenticated && <div><h2>Welcome {this.props.user}</h2></div> }

		  </div>
	  );
 	}
};

export default About;
