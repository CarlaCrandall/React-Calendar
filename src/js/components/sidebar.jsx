import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { EventList } from './';
import MONTH_NAMES from '../../config/month-names';

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
		date: React.PropTypes.number,
		eventsByDate: React.PropTypes.object.isRequired,
		prevMonth: React.PropTypes.func.isRequired,
		nextMonth: React.PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = this.getStateValues(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getStateValues(nextProps));
	}

	getStateValues(props) {
		return {
			events: props.eventsByDate[`day_${props.date}`] || null
		};
	}

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
			<header className="sidebar__heading-container">
				<h1 className="sidebar__heading">{MONTH_NAMES[this.props.month]} {this.props.year}</h1>
				<div className="sidebar__button-container">
					{this.renderButton(this.props.prevMonth, 'fa-chevron-left', 'Previous Month')}
					{this.renderButton(this.props.nextMonth, 'fa-chevron-right', 'Next Month')}
				</div>
			</header>
		);
	}

	renderContent() {
		return (
			<ReactCSSTransitionGroup
				transitionName={{
					enter: 'sidebar__content--fadein',
					enterActive: 'sidebar__content--fadein--active',
					leave: 'sidebar__content--fadeout',
					leaveActive: 'sidebar__content--fadeout--active',
					appear: 'sidebar__content--fadein',
					appearActive: 'sidebar__content--fadein--active'
				}}
				transitionAppear={true}
  				transitionAppearTimeout={10}
				transitionEnterTimeout={150}
				transitionLeaveTimeout={10}
				component="div"
			>
				<div
					key={`sidebar_${this.props.year}${this.props.month}${this.props.date}`}
					className="sidebar__content"
				>
					{this.props.error && <div className="sidebar__message">Sorry, an error has occurred.</div>}
					{!this.props.loading && !this.props.error && <EventList events={this.state.events} {...this.props} />}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	render() {
		return (
			<div className="sidebar">
				{this.renderHeader()}
				{this.props.date && this.renderContent()}
			</div>
		);
	}
}
