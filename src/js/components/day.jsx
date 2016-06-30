import React from 'react';

/**
 * Day
 * Description:
 * @prop {string} propName - description
 * Example: <Day />
 */

class Day extends React.Component {

	static propTypes = {
		date: React.PropTypes.string
	};

	static defaultProps = {
		date: ''
	};

	render() {
		return (
			<div className="react-calendar__day">
				{this.props.date}
			</div>
		);
	}
}

module.exports = Day;
