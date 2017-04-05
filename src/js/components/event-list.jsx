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

    render() {
        return (
            <div className="event-list">
                <div className="sr-only" tabIndex="0">{this.state.headingText}</div>
                <h2 className="event-list__heading" role="presentation" aria-hidden="true">{this.state.headingText}</h2>
                {this.props.events && this.renderList()}
            </div>
        );
    }
}
