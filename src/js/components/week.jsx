import React from 'react';
import classnames from 'classnames';
import Day from './day.jsx';

/**
 * Week
 * Description:
 * @prop {string} propName - description
 * Example: <Week />
 */

export default class Week extends React.Component {

	static propTypes = {
		isHeading: React.PropTypes.bool,
		days: React.PropTypes.array.isRequired
	};

	static defaultProps = {
		isHeading: false
	};

	renderDays() {
		return this.props.days.map((day, i) => <Day key={i} day={day} />);
	}

	render() {
		let className = classnames({
			'react-calendar__week': true,
			'react-calendar__week--heading': this.props.isHeading
		});

		return (
			<div className={className}>
				{this.props.days.length && this.renderDays()}
			</div>
		);
	}
}
