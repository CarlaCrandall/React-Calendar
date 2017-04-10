import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


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
        const dateObj = moment(`${props.year}-${props.month + 1}-${props.date}`, 'YYYY-M-D');

        return {
            defaultValue: dateObj.format('YYYY-MM-DD'),
            formattedDate: dateObj.format('dddd, MMMM D, YYYY')
        };
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    render() {
        // TODO: Implement aria-describedby for number of events?
        return (
            <div className="datepicker">
                <h1>Calendar Application</h1>
                <p>Activate input to select a date.</p>
                <label htmlFor="datepicker__input" tabIndex="-1">Selected date {this.state.formattedDate}</label>
                <input
                    type="date"
                    id="datepicker__input"
                    defaultValue={this.state.defaultValue}
                    onBlur={event => this.onBlur(event)}
                />
            </div>
        );
    }

}
