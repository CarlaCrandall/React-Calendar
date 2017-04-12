import React from 'react';
import SHORTCUTS from '../../config/keyboard-shortcuts';

/**
 * KeyboardInstructions
 * Description:
 * @prop {string} propName - description
 * Example: <KeyboardInstructions />
 */

export default class KeyboardInstructions extends React.PureComponent {

    // ///////////////////////////////////////////////////////////////////
    // COMPONENT LIFECYCLE
    // ///////////////////////////////////////////////////////////////////

    constructor(props) {
        super(props);

        this.state = {
            displayTable: false
        };

        this.refHandler = this.refHandler.bind(this);
        this.table = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.displayTable && prevState.displayTable !== this.state.displayTable) {
            this.table.focus();
        }
    }


    // ///////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    // ///////////////////////////////////////////////////////////////////

    toggleTable() {
        this.setState({
            displayTable: !this.state.displayTable
        });
    }


    // ///////////////////////////////////////////////////////////////////
    // CUSTOM FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    // Use bound ref callback to prevent table from being set to null
    // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    refHandler(domElement) {
        this.table = domElement;
    }


    // ///////////////////////////////////////////////////////////////////
    // RENDER FUNCTIONS
    // ///////////////////////////////////////////////////////////////////

    renderRow(shortcut, index) {
        return (
            <tr key={index} className="keyboard-instructions__tr" role="row">
                <td className="keyboard-instructions__td" role="gridcell">{shortcut.action}</td>
                <td className="keyboard-instructions__td" role="gridcell">{shortcut.key}</td>
            </tr>
        );
    }

    renderTable() {
        return (
            <table
                className="keyboard-instructions__table"
                role="table"
                tabIndex="0"
                ref={this.refHandler}
            >
                <thead role="rowgroup">
                    <tr className="keyboard-instructions__tr" role="row">
                        <th className="keyboard-instructions__th" role="columnheader">To do this</th>
                        <th className="keyboard-instructions__th" role="columnheader">Press this</th>
                    </tr>
                </thead>
                <tbody className="keyboard-instructions__tbody" role="rowgroup">
                    {SHORTCUTS.map((shortcut, index) => this.renderRow(shortcut, index))}
                </tbody>
            </table>
        );
    }

    render() {
        const buttonText = this.state.displayTable ? 'Hide keyboard instructions' : 'View keyboard instructions';

        return (
            <div className="keyboard-instructions">
                <button className="keyboard-instructions__button" onClick={() => this.toggleTable()}>{buttonText}</button>
                {this.state.displayTable && this.renderTable()}
            </div>
        );
    }

}
