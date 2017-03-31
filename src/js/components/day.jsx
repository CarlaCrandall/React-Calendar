import React from 'react';

/**
 * Day
 * Description:
 * @prop {string} propName - description
 * Example: <Day />
 */

export default class Day extends React.Component {

	static propTypes = {
		date: React.PropTypes.number.isRequired
	};

	render() {
		var className = 'react-calendar__day';

		if (this.props.date === 0) {
			className += ' inactive';
		}

		return (
			<div className={className}>
				{this.props.date > 0 && this.props.date}
			</div>
		);
	}
}
