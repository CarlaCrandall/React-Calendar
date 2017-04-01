import React from 'react';
import EventList from './event-list.jsx';
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
		items: React.PropTypes.any,
		prevMonth: React.PropTypes.func.isRequired,
		nextMonth: React.PropTypes.func.isRequired
	};

	static defaultProps = {
		items: null
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
				{this.props.items && <EventList items={this.props.items} />}
			</div>
		);
	}
}
