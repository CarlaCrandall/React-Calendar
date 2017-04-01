import React from 'react';
import { Event } from './';
import monthNames from '../../config/month-names';

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
		items: React.PropTypes.array
	};

	renderListItem(item, index) {
		return (
			<li key={index}>
				<Event data={item} />
			</li>
		)
	}

	render() {
		return (
			<div className="event-list">
				<h2 className="event-list__heading">Events for {monthNames[this.props.month]} {this.props.date}, {this.props.year}</h2>
				<ul className="event-list__events-container">
					{this.props.items.map((item, index) => this.renderListItem(item, index))}
				</ul>
			</div>
		);
	}
}
