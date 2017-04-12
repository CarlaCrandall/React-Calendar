import React from 'react';


/**
 * Spinner
 * Description:
 * @prop {string} propName - description
 * Example: <Spinner />
 */

export default class Spinner extends React.PureComponent {

    constructor(props) {
        super(props);

        this.refHandler = this.refHandler.bind(this);
        this.spinner = null;
    }

    componentDidMount() {
        this.spinner.focus();
    }

    // Use bound ref callback to prevent spinner from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.spinner = domElement;
    }

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
