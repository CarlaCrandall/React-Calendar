import React from 'react';
import { EventList } from './';
import monthNames from '../../config/month-names';

/**
 * Sidebar
 * Description:
 * @prop {string} propName - description
 * Example: <Sidebar />
 */

export default class Sidebar extends React.Component {

	static propTypes = {
		year: React.PropTypes.number.isRequired,
		month: React.PropTypes.number.isRequired,
		date: React.PropTypes.number.isRequired,
		items: React.PropTypes.array.isRequired,
		prevMonth: React.PropTypes.func.isRequired,
		nextMonth: React.PropTypes.func.isRequired
	};

	renderButton(onClick, icon, label) {
		return (
			<button className="sidebar__button" onClick={() => onClick(this.props.month, this.props.year)}>
				<i className={`fa ${icon}`}></i>
				<span className="sr-only">{label}</span>
			</button>
		);
	}

	renderHeader() {
		return (
			<header>
				<h1 className="sidebar__heading">{monthNames[this.props.month]} {this.props.year}</h1>
				<div className="sidebar__button-container">
					{this.renderButton(this.props.prevMonth, 'fa-chevron-left', 'Previous Month')}
					{this.renderButton(this.props.nextMonth, 'fa-chevron-right', 'Next Month')}
				</div>
			</header>
		);
	}

	renderMessage(message) {
		return (
			<div className="sidebar__message">{message}</div>
		);
	}

	render() {
		return (
			<div className="sidebar">
				{this.renderHeader()}
				<div className="sidebar__content">
					{this.props.error && this.renderMessage("Sorry, an error has occurred.")}
					{this.props.loading && this.renderMessage("EVENTS LOADING")}
					{!this.props.loading && this.props.items.length === 0 && this.renderMessage("There are no events for the selected date.")}
					{!this.props.loading && this.props.items.length > 0 && <EventList {...this.props} />}
				</div>
			</div>
		);
	}
}
