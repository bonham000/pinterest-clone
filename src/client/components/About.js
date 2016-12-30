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
		    		<h3>Please login to add new images.</h3>
		    	</div> }

				{ this.props.isAuthenticated &&
					<div>
						<h2>Welcome {this.props.user}</h2>
						<p>This is app lets you link to images and view images from other users.</p>
						<h3 className = 'credits'><a target = "_blank" href = "https://github.com/bonham000/pinterest-clone">View the source on GitHub</a></h3>
						<h3 className = 'credits'>This is a full stack JavaScript app built with React and Redux.</h3>
					</div> }

		  </div>
	  );
 	}
};

export default About;
