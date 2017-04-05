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

        const isScheduledEvent = this.isScheduledEvent(props.data.start, props.data.end);

        this.state = {
            timeRange: (isScheduledEvent) ? this.getTimeRange(props.data.start, props.data.end) : 'All Day'
        };
    }

    getTimeRange(start, end) {
        const
            startTime = moment(start.dateTime).format('h:mm A'),
            endTime = moment(end.dateTime).format('h:mm A');

        return `${startTime} - ${endTime}`;
    }

    isScheduledEvent(start, end) {
        return start.dateTime !== undefined && end.dateTime !== undefined;
    }

    renderLocation() {
        return (
            <div className="event__location" aria-hidden="true">
                {this.props.data.location}
            </div>
        );
    }

    render() {
        // Build event text for screenreader
        let screenReaderText = `${this.props.data.summary} ${this.state.timeRange}`;
        screenReaderText += (this.props.data.location) ? ` at ${this.props.data.location}` : '';

        return (
            <div className="event">
                <div className="event__time" aria-hidden="true">{this.state.timeRange}</div>
                <h3 className="event__name" aria-label={screenReaderText}>{this.props.data.summary}</h3>
                {this.props.data.location && this.renderLocation()}
            </div>
        );
    }
}
