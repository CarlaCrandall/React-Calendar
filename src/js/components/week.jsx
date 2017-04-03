import React from 'react';
import { Day } from './';

/**
 * Week
 * Description:
 * @prop {string} propName - description
 * Example: <Week />
 */

export default class Week extends React.Component {

	static propTypes = {
		days: React.PropTypes.array.isRequired,
		date: React.PropTypes.number.isRequired,
		eventsByDate: React.PropTypes.object,
		isHeading: React.PropTypes.bool,
		selectDate: React.PropTypes.func
	};

	static defaultProps = {
		eventsByDate: {},
		isHeading: false,
		selectDate: () => false
	};

	renderDay(day, index) {
		return (
			<Day
				key={index}
				day={day}
				events={this.props.eventsByDate[`day_${day}`]}
				isHeading={this.props.isHeading}
				isSelected={day === this.props.date}
				selectDate={this.props.selectDate}
			/>
		);
	}

	render() {
		return (
			<div className="week">
				{this.props.days.length && this.props.days.map((day, i) => this.renderDay(day, i))}
			</div>
		);
	}
}
