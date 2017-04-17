import React from 'react';
import PropTypes from 'prop-types';
import { Day } from '../';

/**
 * Week
 * Description: Displays a week. Used for each row of the calendar.
 * @prop {string} identifier - A unique string for each week of the month
 * @prop {array} days - An array containing all the days for the week
 * @prop {int} year - The year that is currently selected
 * @prop {int} month - The month that is currently selected
 * @prop {int} date - The date that is currently selected
 * @prop {object} eventsByDate - An object of all events for the month, filtered into arrays for each day
 * prop {boolean} isHeading - Indicates whether the week should use heading styles
 * @prop {function} SELECT_DATE - Function that updates the date prop
 */

export default class Week extends React.Component {

    static propTypes = {
        identifier: PropTypes.string,
        days: PropTypes.array.isRequired,
        year: PropTypes.number,
        month: PropTypes.number,
        date: PropTypes.number,
        eventsByDate: PropTypes.object,
        isHeading: PropTypes.bool,
        SELECT_DATE: PropTypes.func
    };

    static defaultProps = {
        identifier: '',
        year: null,
        month: null,
        date: null,
        eventsByDate: {},
        isHeading: false,
        SELECT_DATE: () => false
    };


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    renderDay(day, index) {
        return (
            <Day
                key={index}
                year={this.props.year}
                month={this.props.month}
                date={day}
                events={this.props.eventsByDate[`day_${day}`]}
                isHeading={this.props.isHeading}
                isSelected={day === this.props.date}
                SELECT_DATE={this.props.SELECT_DATE}
            />
        );
    }

    render() {
        return (
            <div key={this.props.identifier} className="week" role="row">
                {this.props.days.length && this.props.days.map((day, i) => this.renderDay(day, i))}
            </div>
        );
    }
}
