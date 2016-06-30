import React from 'react';
import Week from './week.jsx';
import moment from 'moment';

/**
 * Month
 * Description:
 * @prop {string} propName - description
 * Example: <Month />
 */

class Month extends React.Component {

	static propTypes = {
		year: React.PropTypes.string,
		num: React.PropTypes.string,
		name: React.PropTypes.string
	};

	static defaultProps = {
		year: '',
		num: '',
		name: ''
	};

	constructor(props) {
		super(props);

		var date = moment(`${this.props.year}-${this.props.num}-01`),
			startDayOfMonth = date.day(),
			daysInMonth = date.daysInMonth();

		this.state = this.calculateWeeksOfMonth(startDayOfMonth, daysInMonth);
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

	render() {
		return (
			<div className="react-calendar__month">
				<h1>{this.props.name}</h1>
				{this.state.weeks && this.renderWeeks()}
			</div>
		);
	}
}

module.exports = Month;
