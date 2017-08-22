import React, { Component } from 'react';

import '../styles/App.css';
import GameConsole from './GameConsole';

class Main extends Component {
    render() {
        return (
            <div className="app">
                <h1 className="text-center">Zero Sum Game</h1>
                <GameConsole store={this.props} />
            </div>
        );
    }
}

export default Main;