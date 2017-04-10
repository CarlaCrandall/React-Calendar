import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { EventList } from './';
import MONTH_NAMES from '../../config/month-names';

/**
 * Sidebar
 * Description:
 * @prop {string} propName - description
 * Example: <Sidebar />
 */

export default class Sidebar extends React.Component {

    static propTypes = {
        loading: React.PropTypes.bool.isRequired,
        error: React.PropTypes.bool.isRequired,
        year: React.PropTypes.number.isRequired,
        month: React.PropTypes.number.isRequired,
        date: React.PropTypes.number,
        eventsByDate: React.PropTypes.object,
        PREV_MONTH: React.PropTypes.func.isRequired,
        NEXT_MONTH: React.PropTypes.func.isRequired
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
        const headingText = `${MONTH_NAMES[this.props.month]} ${this.props.year}`;

        // id is required for aria-labedledby in Calendar component
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
            <ReactCSSTransitionGroup
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
            </ReactCSSTransitionGroup>
        );
    }

    render() {
        return (
            <div className="sidebar">
                {this.renderHeader()}
                {this.props.date && this.renderContent()}
            </div>
        );
    }
}
