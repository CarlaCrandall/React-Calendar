import React from 'react';
import moment from 'moment';

/**
 * Event
 * Description:
 * @prop {string} propName - description
 * Example: <Event />
 */

export default class Event extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		let isScheduledEvent = this.isScheduledEvent(props.data.start, props.data.end);

		this.state = {
			timeRange: (isScheduledEvent) ? this.getTimeRange(props.data.start, props.data.end) : 'All Day'
		};
	}

	isScheduledEvent(start, end) {
		return start.dateTime !== undefined && end.dateTime !== undefined;
	}

	getTimeRange(start, end) {
		let startTime = moment(start.dateTime).format('h:mm A'),
			endTime = moment(end.dateTime).format('h:mm A');

		return `${startTime} - ${endTime}`;
	}

	renderLocation() {
		return (
			<div className="react-calendar__event__location">
				<i className="fa fa-map-marker"></i>
				{this.props.data.location}
			</div>
		);
	}

	render() {
		return (
			<div className="react-calendar__event">
				<div className="react-calendar__event__time">{this.state.timeRange}</div>
				<h3 className="react-calendar__event__name">{this.props.data.summary}</h3>
				{this.props.data.location && this.renderLocation()}
			</div>
		);
	}
}