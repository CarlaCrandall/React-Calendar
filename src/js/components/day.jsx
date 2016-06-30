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

module.exports = Day;
