import React from 'react';
import { Day } from './';

/**
 * Week
 * Description:
 * @prop {string} propName - description
 * Example: <Week />
 */

export default class Week extends React.Component {

    static propTypes = {
        identifier: React.PropTypes.string,
        days: React.PropTypes.array.isRequired,
        year: React.PropTypes.number,
        month: React.PropTypes.number,
        date: React.PropTypes.number,
        eventsByDate: React.PropTypes.object,
        isHeading: React.PropTypes.bool,
        SELECT_DATE: React.PropTypes.func
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
