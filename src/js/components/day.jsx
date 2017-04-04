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
		date: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
		events: React.PropTypes.array,
		isHeading: React.PropTypes.bool,
		isSelected: React.PropTypes.bool,
		selectDate: React.PropTypes.func.isRequired
	};

	static defaultProps = {
		events: [],
		isHeading: false,
		isSelected: false
	};

	renderButton() {
		let date = moment(`${this.props.year}-${this.props.month + 1}-${this.props.date}`, 'YYYY-M-D'),
			screenreaderText = `${date.format('D, dddd MMMM YYYY')}.`;

		screenreaderText += (this.props.isSelected) ? ' Currently selected date' : '';
		screenreaderText += (this.props.events.length === 1) ? ` 1 event is scheduled on this date` : ` ${this.props.events.length} events are scheduled on this date`;

		return (
			<button
				className="day__button"
				tabIndex="-1"
				aria-label={screenreaderText}
				onClick={() => this.props.selectDate(this.props.date)}
			>
				{this.props.date}
			</button>
		);
	}

	renderHeadingText() {
		return (
			<span>{this.props.date}</span>
		)
	}

	render() {
		let isHidden = this.props.date === 0,
			className = classnames({
				'day': true,
				'day--heading': this.props.isHeading,
				'day--selected': this.props.isSelected,
				'day--focused': this.props.date === this.props.focusedDate,
				'day--has-events': this.props.events.length > 0
			});

		// ID used by Calendar component for screenreader accessibility
		return (
			<div className={className}>
				<div
					className="day__text"
					id={`calendar__day__${this.props.date}`}
					role="menuitem"
				>
					{!isHidden && this.props.isHeading && this.renderHeadingText()}
					{!isHidden && !this.props.isHeading && this.renderButton()}
				</div>
			</div>
		);
	}
}
