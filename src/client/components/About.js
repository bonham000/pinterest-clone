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

		    <h1>Welcome to the Free Code Camp Pinterest Clone</h1>

		    {

		    	!this.props.isAuthenticated

		    	&&

		    	<div>
		    		<h3>Please login to add new images.</h3>
		    	</div>

		    }

				{

					this.props.isAuthenticated

					&&

					<div>
						<h2>Welcome {this.props.user}</h2>
						<p>This is a Pinterst Clone App that  lets you link to images and view images from your friends.</p>
						<h3 className = 'credits'><a target = "_blank" href = "https://github.com/bonham000/pinterest-clone">View the source on GitHub</a></h3>
						<h3 className = 'credits'>This app was created with React and Redux and is a <a target = "_blank" href = "https://www.freecodecamp.com/challenges/build-a-pinterest-clone">project for Free Code Camp</a>.</h3>
					</div>

				}

		  </div>
	  );
 	}
};

export default About;
