import React from 'react';
import Month from './month.jsx';

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

	render() {
		return (
			<div className="react-calendar__calendar">
				<Month {...this.props} />
			</div>
		);
	}
}
