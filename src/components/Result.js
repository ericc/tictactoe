import React, { Component } from 'react';

class Result extends Component {
    render () {
        return (
            <div id="results" className="overlay">
                <div className="panel">
                    <h2 className="panel-heading text-center">Results</h2>
                    <div className="text-center">
                        <p id="message">
                            {this.props.result === 'COMPUTER_WINS' ? 'The Computer has won!' : 'The game has ended in a tie.'}
                        </p>
                        <div className="form-group">
                            <button type="button" id="restart-btn" className="btn btn-primary" onClick={this.props.resetGame}><i className="fa fa-repeat fa-btn"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;