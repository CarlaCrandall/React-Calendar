import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';
import store from './stores';
import { Sidebar, Calendar } from './components';


class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// Load events from Google Calendar API
		this.props.fetchEvents(this.props.calendar);
	}

	componentWillReceiveProps(nextProps) {
		let nextCalendar = nextProps.calendar,
			thisCalendar = this.props.calendar;

		// Month has changed, fetch events
		if (nextCalendar.month !== thisCalendar.month) {
			this.props.fetchEvents(nextCalendar);
		}
	}

	render() {
		let {calendar, events, ...actions} = this.props;

		return (
			<div className="react-calendar">
				<Calendar {...calendar} {...events} {...actions} />
				<Sidebar {...calendar} {...events} {...actions} />
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
