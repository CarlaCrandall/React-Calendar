import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { EventList } from './';

/**
 * Sidebar
 * Description:
 * @prop {string} propName - description
 * Example: <Sidebar />
 */

export default class Sidebar extends React.Component {

    static propTypes = {
        displayDatePicker: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired,
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        date: PropTypes.number,
        eventsByDate: PropTypes.object,
        PREV_MONTH: PropTypes.func.isRequired,
        NEXT_MONTH: PropTypes.func.isRequired
    };

    static defaultProps = {
        date: null,
        eventsByDate: null
    };


    renderButton(onClick, btnClass, label) {
        const className = classnames({
            sidebar__button: true,
            [`sidebar__button--${btnClass}`]: true
        });

        return (
            <button
                className={className}
                tabIndex="-1"
                onClick={() => onClick(this.props.month, this.props.year, this.props.date)}
            >
                <span className="sr-only">{label}</span>
            </button>
        );
    }

    renderHeader() {
        const
            dateObj = moment(`${this.props.year}-${this.props.month}`, 'YYYY-M'),
            headingText = dateObj.format('MMMM, YYYY');

        // id is required for aria-labedledby in Calendar component
        // If date input is diplayed, hide the heading and buttons from screen readers
        return (
            <header className="sidebar__heading-container">
                <h1
                    id="calendar__heading"
                    className="sidebar__heading"
                    aria-label={`Calendar for ${headingText}`}
                >
                    {headingText}
                </h1>
                <div className="sidebar__button-container">
                    {this.renderButton(this.props.PREV_MONTH, 'previous', 'Previous Month')}
                    {this.renderButton(this.props.NEXT_MONTH, 'next', 'Next Month')}
                </div>
            </header>
        );
    }

    renderContent() {
        const readyToRender = !this.props.loading && !this.props.error && this.props.eventsByDate;

        return (
            <CSSTransitionGroup
                transitionName={{
                    enter: 'sidebar__content--fadein',
                    enterActive: 'sidebar__content--fadein--active',
                    leave: 'sidebar__content--fadeout',
                    leaveActive: 'sidebar__content--fadeout--active',
                    appear: 'sidebar__content--fadein',
                    appearActive: 'sidebar__content--fadein--active'
                }}
                transitionAppear={true}
                transitionAppearTimeout={10}
                transitionEnterTimeout={150}
                transitionLeaveTimeout={10}
                component="div"
            >
                <div
                    key={`sidebar_${this.props.year}${this.props.month}${this.props.date}`}
                    className="sidebar__content"
                >
                    {this.props.error && <div className="sidebar__message">Sorry, an error has occurred.</div>}
                    {readyToRender && <EventList events={this.props.eventsByDate[`day_${this.props.date}`]} {...this.props} />}
                </div>
            </CSSTransitionGroup>
        );
    }

    render() {
        return (
            <div className="sidebar">
                {!this.props.displayDatePicker && this.renderHeader()}
                {this.props.date && this.renderContent()}
            </div>
        );
    }
}
