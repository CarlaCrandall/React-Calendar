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
		currentYear: React.PropTypes.string,
		currentMonthNum: React.PropTypes.string,
		currentMonthName: React.PropTypes.string
	};

	static defaultProps = {
		currentYear: '2016',
		currentMonthNum: '01',
		currentMonthName: 'January'
	};

	render() {
		return (
			<div className="react-calendar__calendar">
				<Month
					year={this.props.currentYear}
					num={this.props.currentMonthNum}
					name={this.props.currentMonthName}
				/>
			</div>
		);
	}
}

module.exports = Calendar;
