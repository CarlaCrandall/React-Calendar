import React from 'react';
import PropTypes from 'prop-types';
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
        year: PropTypes.number,
        month: PropTypes.number,
        date: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        events: PropTypes.array,
        isHeading: PropTypes.bool,
        isSelected: PropTypes.bool,
        SELECT_DATE: PropTypes.func.isRequired
    };

    static defaultProps = {
        year: null,
        month: null,
        events: [],
        isHeading: false,
        isSelected: false
    };

    constructor(props) {
        super(props);

        this.refHandler = this.refHandler.bind(this);
        this.dayButton = null;
    }

    componentDidMount() {
        if (this.props.isSelected) {
            this.dayButton.focus();
        }
    }

    componentDidUpdate(prevProps) {
        // When new date is selected, focus on button
        // To make sure screen readers announce updated content
        if (this.props.isSelected && this.props.isSelected !== prevProps.isSelected) {
            // Timeout needed to fix Safari Voiceover bug
            setTimeout(() => this.dayButton.focus(), 50);
        }
    }

    // Use bound ref callback to prevent dayButton from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.dayButton = domElement;
    }

    renderButton() {
        const dateObj = moment(`${this.props.year}-${this.props.month + 1}-${this.props.date}`, 'YYYY-M-D');

        // Build date text for screen reader
        let screenReaderText = `${dateObj.format('dddd, MMMM D, YYYY')},`;
        screenReaderText += (this.props.events.length === 1) ? ' 1 event' : ` ${this.props.events.length} events`;

        return (
            <button
                className="day__button"
                tabIndex={this.props.isSelected ? '0' : '-1'}
                aria-label={screenReaderText}
                ref={this.refHandler}
                onClick={() => this.props.SELECT_DATE(this.props.date)}
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
                'day--has-events': this.props.events.length > 0
            });

        return (
            <div className={className} role="gridcell" aria-label="Selected date">
                <div className="day__text">
                    {!isHidden && this.props.isHeading && this.renderHeadingText()}
                    {!isHidden && !this.props.isHeading && this.renderButton()}
                </div>
            </div>
        );
    }
}
