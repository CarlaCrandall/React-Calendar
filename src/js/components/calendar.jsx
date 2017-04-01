import React from 'react';
import moment from 'moment';
import { Week } from './';


/**
 * Calendar
 * Description:
 * @prop {string} propName - description
 * Example: <Calendar />
 */

export default class Calendar extends React.Component {

	static propTypes = {
		year: React.PropTypes.number.isRequired,
		month: React.PropTypes.number.isRequired,
		date: React.PropTypes.number.isRequired,
		selectDate: React.PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = this.getStateValues(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getStateValues(nextProps));
	}

	getStateValues(props) {
		var date = moment(`${props.year}-${props.month + 1}-01`, 'YYYY-M-DD'),
			startDayOfMonth = date.day(),
			daysInMonth = date.daysInMonth();

		return this.calculateWeeksOfMonth(startDayOfMonth, daysInMonth);
	}

	calculateWeeksOfMonth(startDayOfMonth, daysInMonth) {
		var weeks = [
			  [0,0,0,0,0,0,0],
			  [0,0,0,0,0,0,0],
			  [0,0,0,0,0,0,0],
			  [0,0,0,0,0,0,0],
			  [0,0,0,0,0,0,0],
			  [0,0,0,0,0,0,0]
			],
			numWeeks = 6,
			i = startDayOfMonth;

		for(i; i < daysInMonth + startDayOfMonth; i++) {
			let weekIndex = Math.floor(i / 7),
				weekDay = i % 7,
				currentDate = (i - startDayOfMonth) + 1;

			weeks[weekIndex][weekDay] = currentDate;
		}

		if (i === 28) {
		  numWeeks = 4;
		} else if (i < 36) {
		  numWeeks = 5;
		}

		return {
			weeks: weeks,
			numWeeks: numWeeks
		};
	}

	renderHeader() {
		let dayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		return (
			<Week isHeading={true} days={dayHeadings} date={this.props.date} />
		);
	}

	renderWeeks() {
		return this.state.weeks.map((week, i) => {
			if (i < this.state.numWeeks) {
				return (
					<Week key={i} days={week} date={this.props.date} selectDate={this.props.selectDate} />
				)
			}
		});
	}

	render() {
		return (
			<div className="calendar">
				<div className="calendar__grid">
					{this.renderHeader()}
					{this.state.weeks && this.renderWeeks()}
				</div>
			</div>
		);
	}
}
