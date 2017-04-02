import React from 'react';
import { Event } from './';
import MONTH_NAMES from '../../config/month-names';

/**
 * EventList
 * Description:
 * @prop {string} propName - description
 * Example: <EventList />
 */

export default class EventList extends React.Component {

	static propTypes = {
		year: React.PropTypes.number.isRequired,
		month: React.PropTypes.number.isRequired,
		date: React.PropTypes.number.isRequired,
		events: React.PropTypes.array
	};

	renderHeading() {
		let dateString = `${MONTH_NAMES[this.props.month]} ${this.props.date}, ${this.props.year}`,
			heading = (this.props.events) ? `Events for ${dateString}` : `There are no events for ${dateString}`;

		return (
			<h2 className="event-list__heading">{heading}</h2>
		);
	}

	renderListItem(event, index) {
		return (
			<li key={index}>
				<Event data={event} />
			</li>
		)
	}

	renderList() {
		return (
			<ul className="event-list__events-container">
				{this.props.events.map((event, index) => this.renderListItem(event, index))}
			</ul>
		);
	}

	render() {
		return (
			<div className="event-list">
				{this.renderHeading()}
				{this.props.events && this.renderList()}
			</div>
		);
	}
}
