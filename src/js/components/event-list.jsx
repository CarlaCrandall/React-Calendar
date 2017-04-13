import React from 'react';
import PropTypes from 'prop-types';
import KEYBOARD_CODES from '../../config/keyboard-codes';
import * as DateUtils from '../utils/date-utils';
import { Event } from './';


/**
 * EventList
 * Description:
 * @prop {string} propName - description
 * Example: <EventList />
 */

export default class EventList extends React.Component {

    static propTypes = {
        displayDatePicker: PropTypes.bool.isRequired,
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
        events: PropTypes.array
    };

    static defaultProps = {
        events: null
    };


    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        const
            dateObj = DateUtils.getFullDate(props.year, props.month, props.date),
            dateString = dateObj.format('MMMM D, YYYY'),
            fullDateString = dateObj.format('dddd, MMMM D, YYYY'),
            events = props.events || [];

        this.state = {
            screenReaderText: (events.length === 1) ? `There is 1 event for ${fullDateString}` : `There are ${events.length} events for ${fullDateString}`,
            headingText: (events.length > 0) ? `Events for ${dateString}` : `There are no events for ${dateString}`
        };

        this.refHandler = this.refHandler.bind(this);
        this.heading = null;
    }

    componentDidMount() {
        window.addEventListener('keydown', event => this.onWindowKeydown(event));

        // When date picker is active, focus on the heading when a new date is selected
        if (this.props.displayDatePicker) {
            this.heading.focus();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', event => this.onWindowKeydown(event));
    }


    // ///////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    // ///////////////////////////////////////////////////////////////////

    onWindowKeydown(event) {
        // If key is "E" move focus to event list
        if (event.keyCode === KEYBOARD_CODES.APP_SWITCH_KEYS[1]) {
            this.heading.focus();
        }
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    // Use bound ref callback to prevent heading from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.heading = domElement;
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

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
        // Screen reader content needs to be in its own h2 to fix Voiceover bug
        // Visible content will be hidden from screen readers to prevent content from being read twice
        // aria-label is needed to fix Firefox NVDA bug
        return (
            <h2
                id="event-list__screen-reader-text"
                className="event-list__screen-reader-text"
                tabIndex="0"
                aria-label={this.state.screenReaderText}
                ref={this.refHandler}
            >
                {this.state.screenReaderText}
            </h2>
        );
    }

    render() {
        return (
            <div className="event-list" role="application" aria-label="Events List">
                {this.renderScreenReaderContent()}
                <h2 className="event-list__heading" role="presentation" aria-hidden="true">{this.state.headingText}</h2>
                {this.props.events && this.renderList()}
            </div>
        );
    }
}
