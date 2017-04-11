import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as DateUtils from '../utils/date-utils';


/**
 * DatePicker
 * Description:
 * @prop {string} propName - description
 * Example: <DatePicker />
 */

export default class DatePicker extends React.PureComponent {

    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        date: PropTypes.number,
        SELECT_FULL_DATE: PropTypes.func.isRequired
    };

    static defaultProps = {
        date: null
    };


    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.state = this.getStateValues(props);

        this.refHandler = this.refHandler.bind(this);
        this.heading = null;
    }

    componentDidMount() {
        // Focus on heading when date picker is displayed
        this.heading.focus();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateValues(nextProps));
    }


    // ///////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    // ///////////////////////////////////////////////////////////////////

    onBlur(event) {
        const dateObj = moment(event.target.value, 'YYYY-MM-DD');

        // Update the value of the selected date in the store
        this.props.SELECT_FULL_DATE(dateObj.year(), dateObj.month(), dateObj.date());
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    getStateValues(props) {
        const dateObj = DateUtils.getFullDate(props.year, props.month, props.date);

        return {
            defaultValue: dateObj.format('YYYY-MM-DD'),
            formattedDate: dateObj.format('dddd, MMMM D, YYYY')
        };
    }

    // Use bound ref callback to prevent heading from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.heading = domElement;
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    render() {
        return (
            <div className="datepicker">
                <div className="datepicker__container">
                    <h1
                        className="datepicker__heading"
                        tabIndex="-1"
                        ref={this.refHandler}
                    >
                        Calendar Application
                    </h1>
                    <p className="datepicker__instructions">Activate input to select a date.</p>
                    <input
                        type="date"
                        className="datepicker__input"
                        defaultValue={this.state.defaultValue}
                        aria-label={`Selected date ${this.state.formattedDate}`}
                        aria-describedby="event-list__screen-reader-text"
                        onBlur={event => this.onBlur(event)}
                    />
                </div>
            </div>
        );
    }

}
