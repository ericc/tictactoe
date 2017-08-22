import React, { Component } from 'react';
import brain from '../data/brain';

// Presentational Component
class GameBoard extends Component {
    renderSquare(space, i) {
        // User and Computer space occupation
        let userCharacter;
        let computerCharacter;
        if (this.props.settings.players.user === 'o') {
            userCharacter = <i className="fa fa-circle-o"></i>;
            computerCharacter = <i className="fa fa-times"></i>;
        } else {
            userCharacter = <i className="fa fa-times"></i>;
            computerCharacter = <i className="fa fa-circle-o"></i>;
        }
        return (
            <div className="board-col" key={i} onClick={this.props.makeMove.bind(this, space)}>
                {this.props.gameState.boardState.user.indexOf(space) > -1 ? userCharacter : ''}
                {this.props.gameState.boardState.computer.indexOf(space) > -1 ? computerCharacter : ''}
            </div>
        );
    }
    render () {
        let firstRow = brain.grid.slice(0,3).map(this.renderSquare, this);
        let secondRow = brain.grid.slice(3,6).map(this.renderSquare, this);
        let thirdRow = brain.grid.slice(6,9).map(this.renderSquare, this);

        return (
            <div id="board">
                {this.props.gameState.active ? null : <div id="pending-overlay"><p><i className="fa fa-pause"></i></p></div>}
                <div id="grid">
                    <div className="board-row">
                        {firstRow}
                    </div>
                    <div className="board-row">
                        {secondRow}
                    </div>
                    <div className="board-row">
                        {thirdRow}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameBoard;