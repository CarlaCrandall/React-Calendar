import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar.jsx';
import Calendar from './components/calendar.jsx';

var App = React.createClass({
	render() {
		return (
			<div className="app">
				<Sidebar />
				<Calendar />
			</div>
		)
	}
});

ReactDOM.render(<App/>, document.querySelector('#app'));