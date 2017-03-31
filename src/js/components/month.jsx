import React from 'react';
import moment from 'moment';
import Week from './week.jsx';


/**
 * Month
 * Description:
 * @prop {string} propName - description
 * Example: <Month />
 */

export default class Month extends React.Component {

	static propTypes = {
		year: React.PropTypes.number.isRequired,
		month: React.PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);

		this.state = this.getStateValues(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getStateValues(nextProps));
	}

	getStateValues(props) {
		// Add leading zero to month value
		var monthNum = props.month + 1;
			monthNum = (monthNum < 10) ? `0${monthNum}` : monthNum;

		var date = moment(`${props.year}-${monthNum}-01`),
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
		return (
			<Week isHeading={true} days={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}/>
		);
	}

	renderWeeks() {
		return this.state.weeks.map((week, i) => {
			if (i < this.state.numWeeks) {
				return (
					<Week key={i} days={week} />
				)
			}
		});
	}

	render() {
		return (
			<div className="react-calendar__month">
				{this.renderHeader()}
				{this.state.weeks && this.renderWeeks()}
			</div>
		);
	}
}
