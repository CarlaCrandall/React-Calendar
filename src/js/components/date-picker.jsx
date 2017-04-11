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
        loading: PropTypes.bool.isRequired,
        eventsByDate: PropTypes.object,
        SELECT_FULL_DATE: PropTypes.func.isRequired
    };

    static defaultProps = {
        date: null,
        eventsByDate: null
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
        return (
            <div className="datepicker">
                <div className="datepicker__container">
                    <h1 className="datepicker__heading">Calendar Application</h1>
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
