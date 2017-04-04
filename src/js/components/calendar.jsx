import React from 'react';
import moment from 'moment';
import { Month } from './';


/**
 * Calendar
 * Description:
 * @prop {string} propName - description
 * Example: <Calendar />
 */

export default class Calendar extends React.Component {

	static propTypes = {
		year: React.PropTypes.number.isRequired,
		month: React.PropTypes.number.isRequired,
		date: React.PropTypes.number,
		focusedDate: React.PropTypes.number.isRequired,
		eventsByDate: React.PropTypes.object.isRequired,
		selectDate: React.PropTypes.func.isRequired,
		focusDate: React.PropTypes.func.isRequired,
		nextMonth: React.PropTypes.func.isRequired,
		prevMonth: React.PropTypes.func.isRequired
	};


	//////////////////////////////////////////////////////////////////////
	// COMPONENT LIFECYCLE
	//////////////////////////////////////////////////////////////////////

	constructor(props) {
		super(props);

		this.refHandler = this.refHandler.bind(this);
		this.calendarGrid = null;

		this.state = this.getStateValues(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getStateValues(nextProps));
	}


	//////////////////////////////////////////////////////////////////////
	// HELPER FUNCTIONS
	//////////////////////////////////////////////////////////////////////

	getStateValues(props) {
		// For keyboard functionality we need to fake the currently focused date...
		// Actual keyboard focus is on the calendar grid div
		// When the user presses the arrow keys we update the value of the focusedDate and apply styles
		return {
			focusedDateObj: moment(`${props.year}-${props.month + 1}-${props.focusedDate}`, 'YYYY-M-D')
		};
	}

	checkIfCurrentMonth(focusedDateObj) {
		let focusedMonth = focusedDateObj.month();

		// If currently focused date is in the previous month, update the calendar
		if (focusedMonth < this.props.month) {
			this.props.prevMonth(this.props.month, this.props.year, focusedDateObj.date());
		}
		// If currently focused date is in the next month, update the calendar
		else if (focusedMonth > this.props.month) {
			this.props.nextMonth(this.props.month, this.props.year, focusedDateObj.date());
		}
	}


	//////////////////////////////////////////////////////////////////////
	// EVENT HANDLERS
	//////////////////////////////////////////////////////////////////////

	refHandler(domElement) {
		this.calendarGrid = domElement;
	}

	handleArrowKey(keyCode) {
		let focusedDateObj = this.state.focusedDateObj.clone();

		switch(keyCode) {
		    // left arrow
		    case 37:
		        focusedDateObj.subtract(1, 'days');
		        break;
		    // right arrow
		    case 39:
		        focusedDateObj.add(1, 'days');
		        break;
		    // up arrow
		    case 38:
		        focusedDateObj.subtract(7, 'days');
		        break;
		    // down arrow
		    case 40:
		        focusedDateObj.add(7, 'days');
		        break;
		    default:
		        break;
		}

		// Move calendar to next or previous month, if necessary
		this.checkIfCurrentMonth(focusedDateObj);

		// Update the value of the focusedDate in the store
		this.props.focusDate(focusedDateObj.date());
	}

	onClick() {
		// Chrome Fix
		// When user clicks on child button, apply keyboard focus to grid
		// Allows user to switch between mouse and keyboard functionality
		this.calendarGrid.focus();
	}

	onKeyDown(event) {
		// On enter or spacebar, select the focusedDate
		if (event.keyCode === 13 || event.keyCode === 32) {
			event.preventDefault();
		    this.props.selectDate(this.props.focusedDate);
		}
		// On arrow keys, update the focusedDate
		else if ([37,38,39,40].indexOf(event.keyCode) > -1) {
			event.preventDefault();
			this.handleArrowKey(event.keyCode);
		}
	}

	updateActiveDescendant() {
		// aria-activedescendant tells screen readers which date is currently "focused"
		// Has to be called from Month's componentDidUpdate to ensure the required elements have rendered
		// Active descendant is equal to the ID of the focusedDate element
		this.calendarGrid.setAttribute('aria-activedescendant', `calendar__day__${this.props.focusedDate}`);
	}


	//////////////////////////////////////////////////////////////////////
	// RENDER FUNCTIONS
	//////////////////////////////////////////////////////////////////////

	render() {
		return (
			<div className="calendar">
				<div
					className="calendar__grid"
					tabIndex="0"
					role="menu"
					ref={this.refHandler}
					onClick={() => this.onClick()}
					onKeyDown={(event) => this.onKeyDown(event)}
				>
					<Month {...this.props} onUpdate={() => this.updateActiveDescendant()} />
				</div>
			</div>
		);
	}
}
