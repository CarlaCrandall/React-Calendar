import React from 'react';
import Week from './week.jsx';

/**
 * Calendar
 * Description:
 * @prop {string} propName - description
 * Example: <Calendar />
 */

class Calendar extends React.Component {

	static propTypes = {
	};

	static defaultProps = {
	};

	render() {
		return (
			<div className="react-calendar__calendar">
				<Week />
			</div>
		);
	}
}

module.exports = Calendar;
