import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * Event
 * Description:
 * @prop {string} propName - description
 * Example: <Event />
 */

export default class Event extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            eventDate: moment(props.data.start.date || props.data.start.dateTime).format('dddd, MMMM D, YYYY'),
            isScheduledEvent: this.isScheduledEvent(props.data.start, props.data.end),
            timeRange: this.getTimeRange(props.data.start, props.data.end)
        };
    }

    getTimeRange(start, end) {
        const
            startTime = moment(start.dateTime).format('h:mm A'),
            endTime = moment(end.dateTime).format('h:mm A');

        return { startTime, endTime };
    }

    getScreenReaderText(eventData, timeRange) {
        // Build event text for screen reader
        let screenReaderText = (this.state.isScheduledEvent) ? ` ${timeRange.startTime} to ${timeRange.endTime}` : 'All day';
        screenReaderText += `, ${eventData.summary}`;
        screenReaderText += (eventData.location) ? `, location ${eventData.location}` : '';

        return screenReaderText;
    }

    isScheduledEvent(start, end) {
        return start.dateTime !== undefined && end.dateTime !== undefined;
    }

    renderLocation() {
        return (
            <div className="event__location">{this.props.data.location}</div>
        );
    }

    renderScreenReaderContent() {
        const screenReaderText = this.getScreenReaderText(this.props.data, this.state.timeRange);

        // aria-label is needed to fix Firefox NVDA bug
        return (
            <div
                className="sidebar__screenreader"
                tabIndex="0"
                aria-label={screenReaderText}
            >
                {screenReaderText}
            </div>
        );
    }

    render() {
        const timeRangeText = (this.state.isScheduledEvent) ? `${this.state.timeRange.startTime} - ${this.state.timeRange.endTime}` : 'All Day';

        return (
            <div className="event">
                {this.renderScreenReaderContent()}
                <div className="event__content" role="presentation" aria-hidden="true">
                    <div className="event__time">{timeRangeText}</div>
                    <h3 className="event__name">{this.props.data.summary}</h3>
                    {this.props.data.location && this.renderLocation()}
                </div>
            </div>
        );
    }
}
