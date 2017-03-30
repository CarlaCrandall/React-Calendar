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
		month: {
			num: 1,
			name: 'January'
		}
	};

	render() {
		return (
			<div className="react-calendar__calendar">
				<Month
					year={this.props.year}
					num={this.props.month.num}
					name={this.props.month.name}
				/>
			</div>
		);
	}
}

module.exports = Calendar;
