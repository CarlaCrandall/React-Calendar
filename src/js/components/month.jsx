import React from 'react';
import PropTypes from 'prop-types';
import KEYBOARD_CODES from '../../config/keyboard-codes';
import * as DateUtils from '../utils/date-utils';
import { Week } from './';


/**
 * Month
 * Description:
 * @prop {string} propName - description
 * Example: <Month />
 */

export default class Month extends React.Component {

    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        date: PropTypes.number,
        eventsByDate: PropTypes.object,
        SELECT_DATE: PropTypes.func.isRequired
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
        this.state = this.getStateValues(props);

        this.refHandler = this.refHandler.bind(this);
        this.grid = null;
    }

    componentDidMount() {
        window.addEventListener('keydown', event => this.onWindowKeydown(event));
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateValues(nextProps));
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', event => this.onWindowKeydown(event));
    }


    // ///////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    // ///////////////////////////////////////////////////////////////////

    onWindowKeydown(event) {
        // If key is "C" move focus to event list
        if (event.keyCode === KEYBOARD_CODES.APP_SWITCH_KEYS[0]) {
            this.grid.focus();
        }
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    getStateValues(props) {
        // Get day of the week for the first of the month
        // Get total number of days in the month
        const
            date = DateUtils.getMonthAndYear(props.year, props.month),
            startDayOfMonth = date.day(),
            daysInMonth = date.daysInMonth();

        return this.calculateWeeksOfMonth(startDayOfMonth, daysInMonth);
    }

    // Use bound ref callback to prevent grid from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.grid = domElement;
    }

    calculateWeeksOfMonth(startDayOfMonth, daysInMonth) {
        // Setup placeholder weeks
        const
            defaultWeek = [0, 0, 0, 0, 0, 0, 0],
            weeks = [
                [...defaultWeek],
                [...defaultWeek],
                [...defaultWeek],
                [...defaultWeek],
                [...defaultWeek],
                [...defaultWeek]
            ];

        // The max number of weeks in any month is 6
        let numWeeks = 6,
            i = startDayOfMonth;

        // Loop through each day of the month and add it to the correct week array
        for (i; i < daysInMonth + startDayOfMonth; i++) {
            const
                weekIndex = Math.floor(i / 7),
                weekDay = i % 7,
                currentDate = (i - startDayOfMonth) + 1;

            weeks[weekIndex][weekDay] = currentDate;
        }

        // Update numWeeks for special cases
        if (i === 28) {
            numWeeks = 4;
        }
        else if (i < 36) {
            numWeeks = 5;
        }

        return { weeks, numWeeks };
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    renderHeader() {
        const dayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <Week isHeading={true} days={dayHeadings} />
        );
    }

    renderWeek(week, index) {
        // Identifier required to fix voiceover bug in Firefox
        const key = `${this.props.month}_${index}`;

        return (
            <Week
                key={key}
                identifier={key}
                days={week}
                year={this.props.year}
                month={this.props.month}
                date={this.props.date}
                eventsByDate={this.props.eventsByDate}
                SELECT_DATE={this.props.SELECT_DATE}
            />
        );
    }

    renderWeeks() {
        return this.state.weeks.map((week, index) => {
            if (index < this.state.numWeeks) {
                return this.renderWeek(week, index);
            }

            return null;
        });
    }

    render() {
        return (
            <div
                className="month"
                tabIndex="-1"
                role="grid"
                aria-labelledby="calendar__heading"
                ref={this.refHandler}
            >
                {this.renderHeader()}
                {this.state.weeks && this.renderWeeks()}
            </div>
        );
    }
}
