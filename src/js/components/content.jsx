import React from 'react';
import Calendar from './calendar.jsx';

/**
 * Content
 * Description:
 * @prop {string} propName - description
 * Example: <Content />
 */

class Content extends React.Component {

	static propTypes = {
	};

	static defaultProps = {
	};

	render() {
		return (
			<div className="react-calendar__content">
				<Calendar />
			</div>
		);
	}
}

module.exports = Content;
