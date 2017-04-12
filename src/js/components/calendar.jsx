import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import KEYBOARD_CODES from '../../config/keyboard-codes';
import * as DateUtils from '../utils/date-utils';
import { KeyboardInstructions, Month, Spinner } from './';


/**
 * Calendar
 * Description:
 * @prop {string} propName - description
 * Example: <Calendar />
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

    componentDidMount() {
        window.addEventListener('keydown', event => this.onWindowKeyDown(event));
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', event => this.onWindowKeyDown(event));
    }


    // ///////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    // ///////////////////////////////////////////////////////////////////

    onWindowKeyDown(event) {
        const isSidebar = event.target.classList.contains('sidebar__screenreader');

        // Allow keyboard shortcuts to function when focused on sidebar
        if (isSidebar && KEYBOARD_CODES.ALL_KEYS.indexOf(event.keyCode) > -1) {
            this.onKeyDown(event);
        }
    }

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
            // Negative tabIndex needed to fix Firefox bug
            // If date input is supported, hide the calendar from screen readers
            return (
                <div className="calendar" tabIndex="-1">
                    <div
                        className={className}
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
