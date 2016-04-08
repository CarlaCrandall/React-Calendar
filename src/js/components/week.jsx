import React from 'react';
import Day from './day.jsx';

/**
 * Week
 * Description:
 * @prop {string} propName - description
 * Example: <Week />
 */

class Week extends React.Component {

	static propTypes = {
	};

	static defaultProps = {
	};

	render() {
		return (
			<div className="react-calendar__week">
				<Day />
				<Day />
				<Day />
				<Day />
				<Day />
				<Day />
				<Day />
			</div>
		);
	}
}

module.exports = Week;
