import React from 'react';
import PropTypes from 'prop-types';
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
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
        events: PropTypes.array
    };

    static defaultProps = {
        events: null
    };

    constructor(props) {
        super(props);

        const dateString = `${MONTH_NAMES[this.props.month]} ${this.props.date}, ${this.props.year}`;

        this.state = {
            headingText: (this.props.events) ? `Events for ${dateString}` : `There are no events for ${dateString}`
        };
    }

    renderListItem(event, index) {
        return (
            <li key={index}>
                <Event data={event} />
            </li>
        );
    }

    renderList() {
        return (
            <ul className="event-list__events-container">
                {this.props.events.map((event, index) => this.renderListItem(event, index))}
            </ul>
        );
    }

    renderScreenReaderContent() {
        // aria-label is needed to fix Firefox NVDA bug
        return (
            <div
                className="sidebar__screenreader"
                tabIndex="0"
                aria-label={this.state.headingText}
            >
                {this.state.headingText}
            </div>
        );
    }

    render() {
        return (
            <div className="event-list">
                {this.renderScreenReaderContent()}
                <h2 className="event-list__heading" role="presentation" aria-hidden="true">{this.state.headingText}</h2>
                {this.props.events && this.renderList()}
            </div>
        );
    }
}
