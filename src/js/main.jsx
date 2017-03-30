import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import Sidebar from './components/sidebar.jsx';
import Calendar from './components/calendar.jsx';

let store = createStore(reducers);

var App = React.createClass({
	render() {
		let {calendar} = this.props;

		return (
			<div className="app">
				<Sidebar />
				<Calendar {...calendar} />
			</div>
		)
	}
});

let mapStateToProps = state => ({
	calendar: state.calendar
});

const ConnectedRootComponent = connect(mapStateToProps)(App);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRootComponent />
	</Provider>,
	document.querySelector('#app')
);