import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

/**
 * Day
 * Description:
 * @prop {string} propName - description
 * Example: <Day />
 */

export default class Day extends React.Component {

    static propTypes = {
        year: React.PropTypes.number,
        month: React.PropTypes.number,
        date: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]).isRequired,
        focusedDate: React.PropTypes.number,
        events: React.PropTypes.array,
        isHeading: React.PropTypes.bool,
        isSelected: React.PropTypes.bool,
        selectDate: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        year: null,
        month: null,
        focusedDate: null,
        events: [],
        isHeading: false,
        isSelected: false
    };

    renderButton() {
        const date = moment(`${this.props.year}-${this.props.month + 1}-${this.props.date}`, 'YYYY-M-D');

        // Build date text for screen reader
        let screenReaderText = `${date.format('dddd, MMMM D, YYYY')}.`;
        screenReaderText += (this.props.isSelected) ? ' Currently selected date' : '';
        screenReaderText += (this.props.events.length === 1) ? ' 1 event' : ` ${this.props.events.length} events`;

        // ID used by Calendar component for screenreader accessibility
        return (
            <button
                className="day__button"
                id={`calendar__day__${this.props.date}`}
                tabIndex="-1"
                role="menuitem"
                aria-label={screenReaderText}
                onClick={() => this.props.selectDate(this.props.date)}
            >
                {this.props.date}
            </button>
        );
    }

    renderHeadingText() {
        return (
            <span>{this.props.date}</span>
        );
    }

    render() {
        const
            isHidden = this.props.date === 0,
            className = classnames({
                day: true,
                'day--heading': this.props.isHeading,
                'day--selected': this.props.isSelected,
                'day--focused': this.props.date === this.props.focusedDate,
                'day--has-events': this.props.events.length > 0
            });

        return (
            <div className={className}>
                <div className="day__text">
                    {!isHidden && this.props.isHeading && this.renderHeadingText()}
                    {!isHidden && !this.props.isHeading && this.renderButton()}
                </div>
            </div>
        );
    }
}
