import * as React from 'react';

import * as Lattice from '../Lattice';

export interface SnakeGameOptions {
    arenaWidth: number,
    arenaHeight: number,
    facing: Lattice.Direction,
    handleKeyDown: (event: React.KeyboardEvent<any>) => void
}

interface SnakeGameState {
    facing: Lattice.Direction
}

export class SnakeGame extends React.Component<SnakeGameOptions, SnakeGameState> {

    constructor(props: SnakeGameOptions) {
        super(props);
        this.state = { facing: props.facing }
    }

    updateFacing(direction: Lattice.Direction): void {
        this.setState({ facing: direction });
    }

    render(): JSX.Element {
        return <h1 tabIndex={0} onKeyDown={this.props.handleKeyDown}>There is a snake moving {this.state.facing}!</h1>;
    }
}
