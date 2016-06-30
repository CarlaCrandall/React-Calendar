import React from 'react';
import Day from './day.jsx';

/**
 * Week
 * Description:
 * @prop {string} propName - description
 * Example: <Week />
 */

class Week extends React.Component {

	static propTypes = {
		days: React.PropTypes.array
	};

	static defaultProps = {
		days: []
	};

	renderDays() {
		return this.props.days.map((day, i) => {
			return (
				<Day
					key={i}
					date={day}
				/>
			)
		});
	}

	render() {
		return (
			<div className="react-calendar__week">
				{this.props.days.length && this.renderDays()}
			</div>
		);
	}
}

module.exports = Week;
