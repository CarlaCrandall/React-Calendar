import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import * as actions from './actions';
import store from './reducers';
import Sidebar from './components/sidebar.jsx';
import Calendar from './components/calendar.jsx';


class App extends React.Component {
	constructor(props) {
		super(props);

		// Load events from Google Calendar API
		this.props.fetchEvents();
	}

	render() {
		let {calendar, events, ...actions} = this.props;

		return (
			<div className="app">
				<Sidebar {...calendar} {...actions} />
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
