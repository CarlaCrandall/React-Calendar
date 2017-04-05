import React from 'react';
import moment from 'moment';
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
        eventsByDate: React.PropTypes.object.isRequired,
        selectDate: React.PropTypes.func.isRequired,
        nextMonth: React.PropTypes.func.isRequired,
        prevMonth: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        date: null
    }


    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.refHandler = this.refHandler.bind(this);
        this.calendarGrid = null;
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

    onKeyDown(event) {
        // On arrow keys, update the selected date
        if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
            this.handleArrowKey(event.keyCode);
        }
        // On page up/down, update the current month
        else if ([33, 34].indexOf(event.keyCode) > -1) {
            event.preventDefault();
            this.handlePageKey(event.keyCode);
        }
    }

    // ///////////////////////////////////////////////////////////////////
    // KEYBOARD FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    handleArrowKey(keyCode) {
        const dateObj = moment(`${this.props.year}-${this.props.month + 1}-${this.props.date}`, 'YYYY-M-D');

        switch (keyCode) {
            // left arrow
            case 37:
                dateObj.subtract(1, 'days');
                break;
            // right arrow
            case 39:
                dateObj.add(1, 'days');
                break;
            // up arrow
            case 38:
                dateObj.subtract(7, 'days');
                break;
            // down arrow
            case 40:
                dateObj.add(7, 'days');
                break;
            default:
                break;
        }

        // Move calendar to next or previous month, if necessary
        this.checkIfCurrentMonth(dateObj);

        // Update the value of the selected date in the store
        this.props.selectDate(dateObj.date());
    }

    handlePageKey(keyCode) {
        // If page up, go to next month
        if (keyCode === 33) {
            this.props.nextMonth(this.props.month, this.props.year, this.props.date);
        }
        // If page down, go to previous month
        else {
            this.props.prevMonth(this.props.month, this.props.year, this.props.date);
        }
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    refHandler(domElement) {
        this.calendarGrid = domElement;
    }

    checkIfCurrentMonth(dateObj) {
        const selectedMonth = dateObj.month();

        // If currently selected date isn't in the current month, update the calendar
        if (selectedMonth < this.props.month) {
            this.props.prevMonth(this.props.month, this.props.year, dateObj.date());
        }
        else if (selectedMonth > this.props.month) {
            this.props.nextMonth(this.props.month, this.props.year, dateObj.date());
        }
    }

    updateActiveDescendant() {
        // aria-activedescendant tells screen readers which date is currently selected
        // Has to be called from Month's componentDidUpdate to ensure the required elements have rendered
        this.calendarGrid.setAttribute('aria-activedescendant', `calendar__day__${this.props.date}`);
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
                    role="menu"
                    ref={this.refHandler}
                    onClick={() => this.onClick()}
                    onKeyDown={event => this.onKeyDown(event)}
                >
                    <Month
                        year={this.props.year}
                        month={this.props.month}
                        date={this.props.date}
                        eventsByDate={this.props.eventsByDate}
                        selectDate={this.props.selectDate}
                        onUpdate={() => this.updateActiveDescendant()}
                    />
                </div>
            </div>
        );
    }

}
