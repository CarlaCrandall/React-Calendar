import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';
import store from './stores';
import Sidebar from './components/sidebar.jsx';
import Calendar from './components/calendar.jsx';


class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// Load events from Google Calendar API
		this.props.fetchEvents(this.props.calendar);
	}

	getDate(calendar) {
		return moment(`${calendar.year}-${calendar.month + 1}-${calendar.date}`, 'YYYY-M-D');
	}

	componentWillReceiveProps(nextProps) {
		let nextDate = this.getDate(nextProps.calendar),
			thisDate = this.getDate(this.props.calendar);

		// Date has changed, fetch events
		if (!nextDate.isSame(thisDate)) {
			this.props.fetchEvents(nextProps.calendar);
		}
	}

	render() {
		let {calendar, events, ...actions} = this.props;

		return (
			<div className="react-calendar">
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
