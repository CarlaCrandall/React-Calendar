import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import * as actions from './actions';
import store from './stores';
import { Sidebar, Calendar } from './components';


class App extends React.Component {

    static propTypes = {
        calendar: React.PropTypes.object.isRequired,
        events: React.PropTypes.object.isRequired,
        fetchEvents: React.PropTypes.func.isRequired
    };

    componentWillMount() {
        // Load events from Google Calendar API
        this.props.fetchEvents(this.props.calendar);
    }

    componentWillReceiveProps(nextProps) {
        const
            nextCalendar = nextProps.calendar,
            thisCalendar = this.props.calendar;

        // Month has changed, fetch events
        if (nextCalendar.month !== thisCalendar.month) {
            this.props.fetchEvents(nextCalendar);
        }
    }

    render() {
        const { calendar, events, ...actionProps } = this.props;

        return (
            <div className="react-calendar">
                <Calendar {...calendar} {...events} {...actionProps} />
                <Sidebar {...calendar} {...events} {...actionProps} />
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
