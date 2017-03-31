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
				<h1 className="react-calendar__sidebar__header-text">{monthNames[this.props.month]} {this.props.year}</h1>
				<div className="react-calendar__sidebar__header-buttons">
					<button onClick={() => this.props.prevMonth(this.props.month, this.props.year)}>
						<i className="fa fa-chevron-left"></i>
						<span className="sr-only">Previous Month</span>
					</button>
					<button onClick={() => this.props.nextMonth(this.props.month, this.props.year)}>
						<i className="fa fa-chevron-right"></i>
						<span className="sr-only">Next Month</span>
					</button>
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
