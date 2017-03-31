import React from 'react';
import Month from './month.jsx';

/**
 * Calendar
 * Description:
 * @prop {string} propName - description
 * Example: <Calendar />
 */

class Calendar extends React.Component {

	static propTypes = {
		year: React.PropTypes.number,
		month: React.PropTypes.object
	};

	static defaultProps = {
		year: 2017,
		month: 0
	};

	render() {
		return (
			<div className="react-calendar__calendar">
				<Month
					year={this.props.year}
					month={this.props.month}
					nextMonth={this.props.nextMonth}
					prevMonth={this.props.prevMonth}
				/>
			</div>
		);
	}
}

module.exports = Calendar;
