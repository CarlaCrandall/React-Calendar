import React from 'react';
import PropTypes from 'prop-types';
import { Day } from './';

/**
 * Week
 * Description:
 * @prop {string} propName - description
 * Example: <Week />
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
