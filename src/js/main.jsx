import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';
import store from './reducers';
import Sidebar from './components/sidebar.jsx';
import Calendar from './components/calendar.jsx';


class App extends React.Component {
	constructor(props) {
		super(props);

		// Load events from Google Calendar API
		this.props.fetchEvents(props.calendar);
	}

	componentWillReceiveProps(nextProps) {
		let nextCalendar = nextProps.calendar,
			thisCalendar = this.props.calendar;

		let nextDate = moment(`${nextCalendar.year}-${nextCalendar.month}-${nextCalendar.date}`, 'YYYY-M-D'),
			thisDate = moment(`${thisCalendar.year}-${thisCalendar.month}-${thisCalendar.date}`, 'YYYY-M-D');

		// Date has changed, fetch events
		if (!nextDate.isSame(thisDate)) {
			this.props.fetchEvents(nextCalendar);
		}
	}

	render() {
		let {calendar, events, ...actions} = this.props;

		return (
			<div className="app">
				<Sidebar {...calendar} {...events} {...actions} />
				<Calendar {...calendar} {...actions} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	calendar: state.calendar,
	events: state.events
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedApp />
	</Provider>,
	document.querySelector('#app')
);
