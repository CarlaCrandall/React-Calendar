import React from 'react';
import moment from 'moment';
import KEYBOARD_CODES from '../../config/keyboard-codes';
import { Month } from './';


/**
 * Calendar
 * Description:
 * @prop {string} propName - description
 * Example: <Calendar />
 */

export default class Calendar extends React.Component {

    static propTypes = {
        year: React.PropTypes.number.isRequired,
        month: React.PropTypes.number.isRequired,
        date: React.PropTypes.number,
        loading: React.PropTypes.bool.isRequired,
        eventsByDate: React.PropTypes.object.isRequired,
        SELECT_DATE: React.PropTypes.func.isRequired,
        NEXT_MONTH: React.PropTypes.func.isRequired,
        PREV_MONTH: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        date: null
    };


    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.refHandler = this.refHandler.bind(this);
        this.calendarGrid = null;
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

    onClick() {
        // Chrome Fix
        // When user clicks on child button, apply keyboard focus to grid
        // Allows user to switch between mouse and keyboard functionality
        this.calendarGrid.focus();
    }

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
    }

    // ///////////////////////////////////////////////////////////////////
    // KEYBOARD FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    handleArrowKey(key) {
        const dateObj = moment(`${this.props.year}-${this.props.month + 1}-${this.props.date}`, 'YYYY-M-D');

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


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    // Use bound ref callback to prevent this.calendarGrid from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.calendarGrid = domElement;
    }

    updateMonth(selectedMonth, date) {
        // If currently selected date isn't in the current month, update the calendar
        if (selectedMonth < this.props.month) {
            this.props.PREV_MONTH(this.props.month, this.props.year, date);
        }
        else if (selectedMonth > this.props.month) {
            this.props.NEXT_MONTH(this.props.month, this.props.year, date);
        }
    }

    updateActiveDescendant() {
        // aria-activedescendant tells screen readers which date is currently selected
        // Has to be called from Month's componentDidUpdate to ensure the required elements have rendered
        const activeId = (this.props.loading) ? 'loading__message' : `calendar__day__${this.props.date}`;

        // Timeout and focus() needed to fix Safari Voiceover bug
        setTimeout(() => {
            this.calendarGrid.setAttribute('aria-activedescendant', activeId);
            this.calendarGrid.focus();
        }, 100);
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    render() {
        return (
            <div className="calendar">
                <div
                    className="calendar__grid"
                    tabIndex="0"
                    role="group"
                    ref={this.refHandler}
                    onClick={() => this.onClick()}
                    onKeyDown={event => this.onKeyDown(event)}
                >
                    <Month
                        year={this.props.year}
                        month={this.props.month}
                        date={this.props.date}
                        loading={this.props.loading}
                        eventsByDate={this.props.eventsByDate}
                        onUpdate={() => this.updateActiveDescendant()}
                        SELECT_DATE={this.props.SELECT_DATE}
                    />
                </div>
            </div>
        );
    }

}
