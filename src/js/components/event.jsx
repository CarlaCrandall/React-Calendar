import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * Event
 * Description: Displays the information for a single event.
 * @prop {object} data - Contains the required information for the event, including the start time, end time, name, and location
 */

export default class Event extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired
    };


    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.state = {
            isScheduledEvent: this.isScheduledEvent(props.data.start, props.data.end),
            timeRange: this.getTimeRange(props.data.start, props.data.end)
        };
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

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

    // Determine if event is an all day event or scheduled for a specific time
    isScheduledEvent(start, end) {
        return start.dateTime !== undefined && end.dateTime !== undefined;
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    renderLocation() {
        return (
            <div className="event__location">{this.props.data.location}</div>
        );
    }

    renderScreenReaderContent() {
        const screenReaderText = this.getScreenReaderText(this.props.data, this.state.timeRange);

        // Screen reader content needs to be in its own div to fix Voiceover bug on iOS
        // Visible content will be hidden from screen readers to prevent content from being read twice
        // aria-label is needed to fix Firefox NVDA bug
        return (
            <div
                className="event__screen-reader-text"
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
