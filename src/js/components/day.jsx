import React from 'react';

/**
 * Day
 * Description:
 * @prop {string} propName - description
 * Example: <Day />
 */

class Day extends React.Component {

	static propTypes = {
	};

	static defaultProps = {
	};

	render() {
		return (
			<div className="react-calendar__day"></div>
		);
	}
}

module.exports = Day;
