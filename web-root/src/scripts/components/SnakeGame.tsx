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

export class SnakeGame extends React.Component<SnakeGameOptions, SnakeGameState> {

    constructor(props: SnakeGameOptions) {
        super(props);
        this.state = { direction: props.initialDirection }
    }

    render() {
        return <h1>There is a snake moving {this.state.direction}!</h1>;
    }
}
