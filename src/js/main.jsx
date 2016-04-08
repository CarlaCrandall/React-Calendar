import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar.jsx';
import Content from './components/content.jsx';

var App = React.createClass({
	render() {
		return (
			<div className="app">
				<Sidebar />
				<Content />
			</div>
		)
	}
});

ReactDOM.render(<App/>, document.querySelector('#app'));