import React, { Component } from 'react';

import GameBoard from './GameBoard';
import Settings from './Settings';
import Result from './Result';

class GameConsole extends Component {
    // Container Component - All the logic goes in here
    renderResult () {
        switch (this.props.store.gameState.result) {
            case 'COMPUTER_WINS':
            case 'CATS_GAME':
                return <Result
                    result={this.props.store.gameState.result}
                    resetGame={this.props.store.resetGame}
                />;
            case 'GAME_IN_PROGRESS':
            default:
                return '';
        }
    }
    move(space) {
        if (this.props.occupied.indexOf(space) === -1) {
            this.props.userMove(space);
            this.props.computerMove(this.props.settings.goFirst);
        } else {
            console.log('Space already taken!');
        }
    }
    startGame() {
        this.props.changeGameState();
        if (!this.props.goFirst) {
            this.props.computerMove(this.props.goFirst);
        }
    }
    render () {
        return (
            <div id="game-console">
                <Settings
                    changeCharacter={this.props.store.changeCharacter}
                    changeFirst={this.props.store.changeFirst}
                    userCharacter={this.props.store.settings.players.user}
                    goFirst={this.props.store.settings.goFirst}
                    formVisibility={this.props.store.settings.visible}
                    changeGameState = {this.props.store.changeGameState}
                    startGame={this.startGame}
                    resetGame={this.props.store.resetGame}
                    changeSettingVisibility={this.props.store.changeSettingVisibility}
                    gameState={this.props.store.gameState}
                    computerMove={this.props.store.computerMove}
                />
                <GameBoard
                    occupied={this.props.store.gameState.boardState.user.concat(this.props.store.gameState.boardState.computer)}
                    settings={this.props.store.settings}
                    gameState={this.props.store.gameState}
                    boardState={this.props.store.gameState.boardState}
                    makeMove={this.move}
                    userMove={this.props.store.move}
                    computerMove={this.props.store.computerMove}
                />
                {this.renderResult()}
            </div>
        );
    }
}

export default GameConsole;