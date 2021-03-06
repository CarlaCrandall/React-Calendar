import React from 'react';


/**
 * Spinner
 * Description: Presentational component. Displays a loading animation.
 */

export default class Spinner extends React.PureComponent {

    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.refHandler = this.refHandler.bind(this);
        this.spinner = null;
    }

    componentDidMount() {
        this.spinner.focus();
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    // Use bound ref callback to prevent spinner from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.spinner = domElement;
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    render() {
        return (
            <div
                className="spinner"
                tabIndex="-1"
                role="status"
                aria-label="Application data loading"
                ref={this.refHandler}
            >
                <div className="spinner__container">
                    <div className="spinner__static" />
                    <div className="spinner__q1" />
                    <div className="spinner__q2" />
                    <div className="spinner__q3" />
                    <div className="spinner__q4" />
                </div>
            </div>
        );
    }

}
