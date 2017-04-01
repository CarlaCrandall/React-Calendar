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
		days: React.PropTypes.array.isRequired,
		date: React.PropTypes.number.isRequired,
		isHeading: React.PropTypes.bool,
		selectDate: React.PropTypes.func
	};

	static defaultProps = {
		isHeading: false,
		selectDate: () => false
	};

	renderDay(day, index) {
		return (
			<Day
				key={index}
				day={day}
				isHeading={this.props.isHeading}
				isSelected={day === this.props.date}
				selectDate={this.props.selectDate}
			/>
		);
	}

	render() {
		let className = classnames({
			'week': true,
			'week--heading': this.props.isHeading
		});

		return (
			<div className={className}>
				{this.props.days.length && this.props.days.map((day, i) => this.renderDay(day, i))}
			</div>
		);
	}
}
