import React from 'react';
import moment from 'moment';
import monthNames from '../../config/month-names';
import Week from './week.jsx';


/**
 * Month
 * Description:
 * @prop {string} propName - description
 * Example: <Month />
 */

class Month extends React.Component {

	static propTypes = {
		year: React.PropTypes.number,
		month: React.PropTypes.number
	};

	static defaultProps = {
		year: 2017,
		month: 0
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

	renderWeeks() {
		return this.state.weeks.map((week, i) => {
			if (i + 1 <= this.state.numWeeks) {
				return (
					<Week
						key={i}
						days={week}
					/>
				)
			}
		});
	}

	renderHeader() {
		return (
			<header>
				<button onClick={() => this.props.prevMonth(this.props.month, this.props.year)}>&laquo; Prev</button>
				<h1>{monthNames[this.props.month]} {this.props.year}</h1>
				<button onClick={() => this.props.nextMonth(this.props.month, this.props.year)}>&raquo; Next</button>
			</header>
		);
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

module.exports = Month;
