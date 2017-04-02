import React from 'react';
import classnames from 'classnames';

/**
 * Day
 * Description:
 * @prop {string} propName - description
 * Example: <Day />
 */

export default class Day extends React.Component {

	static propTypes = {
		day: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
		events: React.PropTypes.array,
		isHeading: React.PropTypes.bool,
		isSelected: React.PropTypes.bool,
		selectDate: React.PropTypes.func.isRequired
	};

	static defaultProps = {
		isHeading: false,
		isSelected: false
	};

	renderButton(day) {
		return (
			<button className="day__button" onClick={() => this.props.selectDate(day)}>{day}</button>
		);
	}

	renderHeadingText(day) {
		return (
			<span>{day}</span>
		)
	}

	render() {
		let isHidden = this.props.day === 0,
			className = classnames({
				'day': true,
				'day--selected': this.props.isSelected,
				'day--has-events': this.props.events
			});

		return (
			<div className={className}>
				<div className="day__text">
					{!isHidden && this.props.isHeading && this.renderHeadingText(this.props.day)}
					{!isHidden && !this.props.isHeading && this.renderButton(this.props.day)}
				</div>
			</div>
		);
	}
}
