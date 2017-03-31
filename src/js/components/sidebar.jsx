import React from 'react';
import monthNames from '../../config/month-names';

/**
 * Sidebar
 * Description:
 * @prop {string} propName - description
 * Example: <Sidebar />
 */

export default class Sidebar extends React.Component {

	static propTypes = {
		year: React.PropTypes.number.isRequired,
		month: React.PropTypes.number.isRequired,
		prevMonth: React.PropTypes.func.isRequired,
		nextMonth: React.PropTypes.func.isRequired
	};

	renderHeader() {
		return (
			<header>
				<h1>{monthNames[this.props.month]} {this.props.year}</h1>
				<div className="react-calendar__sidebar__header-buttons">
					<button onClick={() => this.props.prevMonth(this.props.month, this.props.year)}>&laquo; Prev</button>
					<button onClick={() => this.props.nextMonth(this.props.month, this.props.year)}>&raquo; Next</button>
				</div>
			</header>
		);
	}

	render() {
		return (
			<div className="react-calendar__sidebar">
				{this.renderHeader()}
			</div>
		);
	}
}
