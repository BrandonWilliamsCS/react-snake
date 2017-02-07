import * as React from "react";
import * as Lattice from "../Lattice";

export interface SnakeGameOptions {
    arenaWidth: number,
    arenaHeight: number,
    initialDirection: Lattice.Direction
}

interface SnakeGameState {
    direction: Lattice.Direction
}

// As these aren't being exported, they're not going to clutter up a "global" "namespace".
const LEFT_KEY_CODE = 37;
const UP_KEY_CODE = 38;
const RIGHT_KEY_CODE = 39;
const DOWN_KEY_CODE = 40;

const LEFT_KEY = 'a';
const UP_KEY = 'w';
const RIGHT_KEY = 'd';
const DOWN_KEY = 's';

export class SnakeGame extends React.Component<SnakeGameOptions, SnakeGameState> {

    constructor(props: SnakeGameOptions) {
        super(props);
        this.state = { direction: props.initialDirection }

        // This binding is necessary to make `this` work in the callback
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    // events
    handleKeyDown(evt: React.KeyboardEvent<any>): void {
        let direction: Lattice.Direction;
        if (evt.keyCode == UP_KEY_CODE || evt.key == UP_KEY) direction = 'up'
        else if (evt.keyCode == DOWN_KEY_CODE || evt.key == DOWN_KEY) direction = 'down'
        else if (evt.keyCode == LEFT_KEY_CODE || evt.key == LEFT_KEY) direction = 'left'
        else if (evt.keyCode == RIGHT_KEY_CODE || evt.key == RIGHT_KEY) direction = 'right'
        else return;
        this.setState({ direction: direction });
    }

    render(): JSX.Element {
        return <h1 onKeyDown={this.handleKeyDown} tabIndex="0">There is a snake moving {this.state.direction}!</h1>;
    }
}
