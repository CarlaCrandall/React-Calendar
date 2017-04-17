import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Sidebar, Calendar, DatePicker } from './components';


export default class App extends React.Component {

    static propTypes = {
        calendar: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        FETCH_EVENTS: PropTypes.func.isRequired
    };


    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.state = {
            supportsDateInput: this.checkForDateInput(),
            displayDatePicker: false
        };
    }

    componentWillMount() {
        // Load events from Google Calendar API
        this.props.FETCH_EVENTS(this.props.calendar);
    }

    componentWillReceiveProps(nextProps) {
        const
            nextCalendar = nextProps.calendar,
            thisCalendar = this.props.calendar;

        // Month has changed, fetch events
        if (nextCalendar.month !== thisCalendar.month || nextCalendar.year !== thisCalendar.year) {
            this.props.FETCH_EVENTS(nextCalendar);
        }
    }


    // ///////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    // ///////////////////////////////////////////////////////////////////

    onDatePickerToggle(event) {
        event.preventDefault();

        this.setState({
            displayDatePicker: !this.state.displayDatePicker
        });
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    // Feature detection check for HTML5 date input
    checkForDateInput() {
        const input = document.createElement('input');
        input.setAttribute('type', 'date');
        return input.type !== 'text';
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    // For browsers that support HTML5 date input
    // Allow screen reader to users to switch from custom calendar to the native date picker
    renderDatePickerButton() {
        let linkText = 'Click here to enable the native date picker (recommended for screenreaders).';

        if (this.state.displayDatePicker) {
            linkText = 'Click here to disable the native date picker.';
        }

        // Link required because button onClick doesn't fire when button is not visible
        return (
            <a href="#" className="sr-only" onClick={event => this.onDatePickerToggle(event)}>{linkText}</a>
        );
    }

    render() {
        const
            { calendar, events, ...actionProps } = this.props,
            className = classnames({
                'react-calendar': true,
                'react-calendar--datepicker-active': this.state.displayDatePicker
            });

        return (
            <div className={className}>
                {this.state.supportsDateInput && this.renderDatePickerButton()}
                {this.state.displayDatePicker
                    ? <DatePicker {...calendar} {...events} {...actionProps} />
                    : <Calendar {...calendar} {...events} {...actionProps} />
                }
                <Sidebar
                    displayDatePicker={this.state.displayDatePicker}
                    {...calendar}
                    {...events}
                    {...actionProps}
                />
            </div>
        );
    }
}
