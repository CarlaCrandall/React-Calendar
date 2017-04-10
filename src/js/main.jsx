import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import * as actions from './actions';
import store from './stores';
import { Sidebar, Calendar, DatePicker } from './components';


class App extends React.Component {

    static propTypes = {
        calendar: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        FETCH_EVENTS: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            supportsDateInput: this.checkForDateInput(),
            displayDatePicker: false
        };
    }

    checkForDateInput() {
        const input = document.createElement('input');
        input.setAttribute('type', 'date');
        return input.type !== 'text';
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

    onClick(event) {
        event.preventDefault();

        this.setState({
            displayDatePicker: !this.state.displayDatePicker
        });
    }

    renderDatePickerButton() {
        let linkText = 'Click here to enable the native date picker (recommended for screenreaders).';

        if (this.state.displayDatePicker) {
            linkText = 'Click here to disable the native date picker (not recommended for screenreaders).';
        }

        return (
            <a href="#" className="sr-only" onClick={event => this.onClick(event)}>{linkText}</a>
        );
    }

    render() {
        const { calendar, events, ...actionProps } = this.props;

        return (
            <div className="react-calendar">
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

const mapStateToProps = state => ({
    calendar: state.calendar,
    events: state.events
});

const
    mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch),
    ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.querySelector('#app')
);
