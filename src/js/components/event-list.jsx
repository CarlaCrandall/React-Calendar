import React from 'react';
import Event from './event.jsx';
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
			<div className="react-calendar__event-list">
				<h2 className="react-calendar__event-list__heading">Events for {monthNames[this.props.month]} {this.props.date}, {this.props.year}</h2>
				<ul className="react-calendar__event-list__events">
					{this.props.items.map((item, index) => this.renderListItem(item, index))}
				</ul>
			</div>
		);
	}
}