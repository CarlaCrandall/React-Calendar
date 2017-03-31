import React from 'react';
import classnames from 'classnames';

/**
 * Day
 * Description:
 * @prop {string} propName - description
 * Example: <Day />
 */

export default class Day extends React.Component {

	static propTypes = {
		day: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]).isRequired
	};

	render() {
		var className = classnames({
			'react-calendar__day': true,
			'react-calendar__day--inactive': this.props.day === 0
		});

		return (
			<div className={className}>
				<div className="react-calendar__day__text">
					{this.props.day !== 0 && this.props.day}
				</div>
			</div>
		);
	}
}
