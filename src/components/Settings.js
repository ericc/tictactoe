import React, { Component } from 'react';

// Presentational Component
class Settings extends Component {
    renderPreGameActions () {
        return (
            <div id="game-actions">
                <button type="button" className="btn btn-start" onClick={this.props.startGame.bind(this)}>Start!</button>
                <button type="button" className="btn btn-primary" onClick={this.props.changeSettingVisibility}><i className="fa fa-pencil fa-btn"></i> Edit</button>
            </div>
        );
    }
    renderInGameActions() {
        return (
            <div id="in-game-actions">
                <button type="button" className="btn btn-primary" onClick={this.props.resetGame}><i className="fa fa-refresh fa-btn"></i> Reset</button>
                <button type="button" className="btn btn-stop" onClick={this.props.changeGameState}><i className="fa fa-stop fa-btn"></i> Stop</button>
            </div>
        );
    }
    renderSettingsDisplay() {
        return (
            <div id="display">
                <p>You are currently playing as:</p>
                <div id="character-display">
                    {this.props.userCharacter === 'o' ? <i className="fa fa-circle-o"></i> : <i className="fa fa-times"></i>}
                </div>
                <p id="first-text">{this.props.goFirst === true ? 'You are going first.' : 'Computer starts.'}</p>
                <div className="form-group text-center">
                    {this.props.gameState.active ? this.renderInGameActions() : this.renderPreGameActions()}
                </div>
            </div>
        );
    }
    renderSettingsForm () {
        return (
            <form>
                <div className="form-group">
                    <p>Choose a character:</p>
                    <label htmlFor="o" className="characters">
                        <input type="radio" id="o" ref="character" name="character" value="o" defaultChecked={this.props.userCharacter === 'o'} onChange={this.props.changeCharacter} />
                        <span><i className="fa fa-circle-o"></i></span>
                    </label>
                    <label htmlFor="x" className="characters">
                        <input type="radio" id="x" ref="character" name="character" value="x" defaultChecked={this.props.userCharacter === 'x'} onChange={this.props.changeCharacter} />
                        <span><i className="fa fa-times"></i></span>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="first"><input type="checkbox" id="first" defaultChecked={this.props.goFirst} onChange={this.props.changeFirst.bind(this)} /> Go First</label>
                </div>
                <div className="form-group text-center">
                    <button type="button" className="btn btn-primary" onClick={this.props.changeSettingVisibility}><i className="fa fa-undo fa-btn"></i> Back</button>
                </div>
            </form>
        );
    }
    render() {
        return (
            <div id="settings-panel" className="panel text-center">
                <h2 className="text-center panel-heading"><i className="fa fa-cog"></i> Game Settings</h2>
                {this.props.formVisibility ? this.renderSettingsForm() : this.renderSettingsDisplay()}

            </div>
        );
    }
}

export default Settings;