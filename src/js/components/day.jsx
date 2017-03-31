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
			<button className="react-calendar__day__button" onClick={() => this.props.selectDate(day)}>{day}</button>
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
				'react-calendar__day': true,
				'react-calendar__day--selected': this.props.isSelected
			});

		return (
			<div className={className}>
				<div className="react-calendar__day__text">
					{!isHidden && this.props.isHeading && this.renderHeadingText(this.props.day)}
					{!isHidden && !this.props.isHeading && this.renderButton(this.props.day)}
				</div>
			</div>
		);
	}
}
