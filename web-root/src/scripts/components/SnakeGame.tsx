import * as React from 'react';

import * as Lattice from '../Lattice';

export interface SnakeGameProps {
    arenaWidth: number,
    arenaHeight: number,
    snakePath: Lattice.Path,
    handleKeyDown: (event: React.KeyboardEvent<any>) => void
}

interface SnakeGameState {
    started: boolean,
    score: number,
    snakePath: Lattice.Path
}

export class SnakeGame extends React.Component<SnakeGameProps, SnakeGameState> {

    constructor(props: SnakeGameProps) {
        super(props);
        this.state = { started: false, score: 0, snakePath: props.snakePath };

        // bind things here so "this" works properly
        this.startGame = this.startGame.bind(this);
        this.setScore = this.setScore.bind(this);
    }

    startGame() {
        // TODO: libraries and/or TS ...
        this.setState({ started: true, score: 0, snakePath: this.state.snakePath });
    }

    setScore(score: number) {
        this.setState({ started: true, score: score, snakePath: this.state.snakePath });
    }

    render(): JSX.Element {
        return (
            <div className="game" tabIndex={0} onKeyDown={this.props.handleKeyDown}>
                <div className="sidebar">
                    <h1>Snake</h1>
                    Eat the pellets.<br/>
                    {this.state.started
                        ? (<span className="score">Eaten: {this.state.score} pellets</span>)
                        : (<button type="button" onClick={this.startGame}>Start!</button>)}
                </div>
                { /* <Arena width={this.props.arenaWidth} height={this.props.arenaHeight} snake={this.state.snakePath} /> */ }
            </div>
        );
    }
}
