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
		items: React.PropTypes.array.isRequired,
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

	renderMessage(message) {
		return (
			<div className="react-calendar__sidebar__message">{message}</div>
		);
	}

	render() {
		return (
			<div className="react-calendar__sidebar">
				{this.renderHeader()}
				<div className="react-calendar__sidebar__content">
					{this.props.error && this.renderMessage("Sorry, an error has occurred.")}
					{this.props.loading && this.renderMessage("EVENTS LOADING")}
					{!this.props.loading && this.props.items.length === 0 && this.renderMessage("There are no events for the selected date.")}
					{!this.props.loading && this.props.items.length > 0 && <EventList items={this.props.items} />}
				</div>
			</div>
		);
	}
}
