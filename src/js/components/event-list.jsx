import React from 'react';

/**
 * EventList
 * Description:
 * @prop {string} propName - description
 * Example: <EventList />
 */

export default class EventList extends React.Component {

	static propTypes = {
		items: React.PropTypes.array
	};

	renderEvent(event, index) {
		return (
			<div key={index} className="react-calendar__event-list__event">
				<h3>{event.summary}</h3>
			</div>
		);
	}

	render() {
		return (
			<div className="react-calendar__event-list">
				{this.props.items.map((event, index) => this.renderEvent(event, index))}
			</div>
		);
	}
}
