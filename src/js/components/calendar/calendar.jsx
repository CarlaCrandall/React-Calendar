import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import KEYBOARD_CODES from '../../../config/keyboard-codes';
import * as DateUtils from '../../utils/date-utils';
import { KeyboardInstructions, Month, Spinner } from '../';


/**
 * Calendar
 * Description: Displays the calendar for the currently selected month and handles keyboard navigation shortcuts.
 * @prop {int} year - The year that is currently selected
 * @prop {int} month - The month that is currently selected
 * @prop {int} date - The date that is currently selected
 * @prop {boolean} loading - Indicates whether the API call is in progress
 * @prop {object} eventsByDate - An object of all events for the month, filtered into arrays for each day
 * @prop {function} SELECT_DATE - Function that updates the date prop,
 * @prop {function} NEXT_MONTH - Function that updates the month prop to the next month
 * @prop {function} PREV_MONTH - Function that updates the month prop to the previous month
 */

export default class Calendar extends React.PureComponent {

    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        date: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        eventsByDate: PropTypes.object,
        SELECT_DATE: PropTypes.func.isRequired,
        NEXT_MONTH: PropTypes.func.isRequired,
        PREV_MONTH: PropTypes.func.isRequired
    };

    static defaultProps = {
        date: null,
        eventsByDate: null
    };


    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.state = {
            hasFocus: true
        };
    }


    // ///////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    // ///////////////////////////////////////////////////////////////////

    onKeyDown(event) {
        // On arrow keys, update the selected date
        if (KEYBOARD_CODES.ARROW_KEYS.indexOf(event.keyCode) > -1) {
            event.preventDefault();
            this.handleArrowKey(event.keyCode);
        }
        // On page up/down, update the current month
        else if (KEYBOARD_CODES.PAGE_KEYS.indexOf(event.keyCode) > -1) {
            event.preventDefault();
            this.handlePageKey(event.keyCode);
        }
        else if (KEYBOARD_CODES.HOME_KEYS.indexOf(event.keyCode) > -1) {
            event.preventDefault();
            this.handleHomeKey(event.keyCode, event.ctrlKey);
        }
    }

    toggleFocus(event) {
        // Toggle focus styles when children of the Calendar have keyboard focus
        this.setState({
            hasFocus: event.type === 'focus'
        });
    }


    // ///////////////////////////////////////////////////////////////////
    // KEYBOARD FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    handleArrowKey(key) {
        const dateObj = DateUtils.getFullDate(this.props.year, this.props.month, this.props.date);

        switch (key) {
            // left arrow, previous day
            case KEYBOARD_CODES.ARROW_KEYS[0]: {
                dateObj.subtract(1, 'days');
                break;
            }
            // up arrow, previous week
            case KEYBOARD_CODES.ARROW_KEYS[1]: {
                dateObj.subtract(7, 'days');
                break;
            }
            // right arrow, next day
            case KEYBOARD_CODES.ARROW_KEYS[2]: {
                dateObj.add(1, 'days');
                break;
            }
            // down arrow, next week
            case KEYBOARD_CODES.ARROW_KEYS[3]: {
                dateObj.add(7, 'days');
                break;
            }
            default: {
                break;
            }
        }

        // Move calendar to next or previous month, if necessary
        this.updateMonth(dateObj.month(), dateObj.date());

        // Update the value of the selected date in the store
        this.props.SELECT_DATE(dateObj.date());
    }

    handlePageKey(key) {
        // If page up, go to next month
        if (key === KEYBOARD_CODES.PAGE_KEYS[0]) {
            this.props.NEXT_MONTH(this.props.month, this.props.year, this.props.date);
        }
        // If page down, go to previous month
        else {
            this.props.PREV_MONTH(this.props.month, this.props.year, this.props.date);
        }
    }

    handleHomeKey(key, ctrlKey) {
        const
            isEndKey = key === KEYBOARD_CODES.HOME_KEYS[0],
            isHomeKey = key === KEYBOARD_CODES.HOME_KEYS[1],
            monthObj = DateUtils.getMonthAndYear(this.props.year, this.props.month);

        let dateObj = DateUtils.getFullDate(this.props.year, this.props.month, this.props.date);


        // If end key, go to last day of week
        if (isEndKey && !ctrlKey) {
            dateObj.endOf('week');
        }
        // If home key, go to first day of week
        else if (isHomeKey && !ctrlKey) {
            dateObj.startOf('week');
        }

        // If ctrl + end key, go to last day of month
        // OR if last day of week is not in this month, go to last day of month
        if ((isEndKey && ctrlKey) ||
            (isEndKey && dateObj.month() !== this.props.month)) {
            dateObj = monthObj.endOf('month');
        }
        // If ctrl + home key, go to first day of month
        // OR if first day of week is not in this month, go to first day of month
        else if ((isHomeKey && ctrlKey) ||
            (isHomeKey && dateObj.month() !== this.props.month)) {
            dateObj = monthObj.startOf('month');
        }

        this.props.SELECT_DATE(dateObj.date());
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    updateMonth(selectedMonth, date) {
        // If currently selected date isn't in the current month, update the calendar
        if (selectedMonth < this.props.month) {
            this.props.PREV_MONTH(this.props.month, this.props.year, date);
        }
        else if (selectedMonth > this.props.month) {
            this.props.NEXT_MONTH(this.props.month, this.props.year, date);
        }
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    render() {
        const className = classnames({
            calendar__grid: true,
            'calendar__grid--focused': this.state.hasFocus
        });

        // Wait for event data before we render calendar
        if (!this.props.loading && this.props.eventsByDate) {
            return (
                <div className="calendar">
                    <div
                        className={className}
                        role="application"
                        aria-label="Calendar Grid, Use keyboard to navigate"
                        onFocus={event => this.toggleFocus(event)}
                        onBlur={event => this.toggleFocus(event)}
                        onKeyDown={event => this.onKeyDown(event)}
                    >
                        <Month
                            year={this.props.year}
                            month={this.props.month}
                            date={this.props.date}
                            eventsByDate={this.props.eventsByDate}
                            SELECT_DATE={this.props.SELECT_DATE}
                        />
                    </div>
                    <KeyboardInstructions />
                </div>
            );
        }

        // Render spinner while waiting for event API call to complete
        return (
            <div className="calendar">
                <div className="calendar__spinner">
                    <Spinner />
                </div>
            </div>
        );
    }

}
