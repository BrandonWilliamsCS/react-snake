import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Lattice from '../Lattice';

import { Arena } from './Arena';

export interface SnakeGameProps {
    arenaWidth: number,
    arenaHeight: number,
    snakePath: Lattice.Path,
    handleKeyDown: (event: React.KeyboardEvent<any>) => void,
    handleStartClick: (event: React.MouseEvent<any>) => void
}

interface SnakeGameState {
    started: boolean,
    score: number,
    snakePath: Lattice.Path
}

export class SnakeGame extends React.Component<SnakeGameProps, SnakeGameState> {

    private element: HTMLElement;

    constructor(props: SnakeGameProps) {
        super(props);
        this.state = { started: false, score: 0, snakePath: props.snakePath };

        // bind things here so "this" works properly
        this.startGame = this.startGame.bind(this);
        this.nextFrame = this.nextFrame.bind(this);
    }

    componentDidUpdate() {
        if(this.state.started)
            this.element.focus();
    }

    startGame() {
        this.setState({ started: true, score: 0, snakePath: this.state.snakePath });
        this.element.focus();
    }

    nextFrame(snakePath: Lattice.Path, score: number) {
        // TODO: libraries and/or TS ...
        this.setState({ started: true, score: score, snakePath: snakePath });
    }

    render(): JSX.Element {
        return (
            <div className="game" tabIndex={0} onKeyDown={this.props.handleKeyDown} ref={(game) => this.element = game}>
                <div className="sidebar">
                    <h1>Snake</h1>
                    Eat the pellets.<br/>
                    {this.state.started
                        ? (<span className="score">Eaten: {this.state.score} pellets</span>)
                        : (<button type="button" onClick={this.props.handleStartClick}>Start!</button>)}
                </div>
                <Arena width={this.props.arenaWidth} height={this.props.arenaHeight} snake={this.state.snakePath} />
            </div>
        );
    }
}
