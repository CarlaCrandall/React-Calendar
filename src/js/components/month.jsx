import React from 'react';
import moment from 'moment';
import { Week } from './';


/**
 * Month
 * Description:
 * @prop {string} propName - description
 * Example: <Month />
 */

export default class Month extends React.Component {

    static propTypes = {
        year: React.PropTypes.number.isRequired,
        month: React.PropTypes.number.isRequired,
        date: React.PropTypes.number,
        focusedDate: React.PropTypes.number.isRequired,
        eventsByDate: React.PropTypes.object.isRequired,
        selectDate: React.PropTypes.func.isRequired,
        onUpdate: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        date: null
    };


    constructor(props) {
        super(props);
        this.state = this.getStateValues(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateValues(nextProps));
    }

    componentDidUpdate() {
        // Timeout needed for Safari in OSX
        setTimeout(() => {
            this.props.onUpdate();
        });
    }

    getStateValues(props) {
        // Get which day of the week the first falls on
        // Get total number of days in the month
        const
            date = moment(`${props.year}-${props.month + 1}-01`, 'YYYY-M-DD'),
            startDayOfMonth = date.day(),
            daysInMonth = date.daysInMonth();

        return this.calculateWeeksOfMonth(startDayOfMonth, daysInMonth);
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

        // Add each day of the month and add it to the correct week array
        for (i; i < daysInMonth + startDayOfMonth; i++) {
            const weekIndex = Math.floor(i / 7),
                weekDay = i % 7,
                currentDate = (i - startDayOfMonth) + 1;

            weeks[weekIndex][weekDay] = currentDate;
        }

        // Update numWeeks for special cases
        if (i === 28) {
            numWeeks = 4;
        } else if (i < 36) {
            numWeeks = 5;
        }

        return { weeks, numWeeks };
    }

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
                focusedDate={this.props.focusedDate}
                eventsByDate={this.props.eventsByDate}
                selectDate={this.props.selectDate}
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
            <div className="month">
                {this.renderHeader()}
                {this.state.weeks && this.renderWeeks()}
            </div>
        );
    }
}
