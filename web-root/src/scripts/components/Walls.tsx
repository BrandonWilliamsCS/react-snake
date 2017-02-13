import * as React from 'react';

import * as Lattice from '../Lattice';

import { Wall } from './Wall';

export interface WallProps {
    width: number,
    height: number,
    cellSize: string
}

export class Walls extends React.Component<WallProps, undefined> {

    // Once the walls are ready, they're permanent. Never bother re-rendering!
    shouldComponentUpdate(): boolean {
        return false;
    }

    render(): JSX.Element {
        return (<div className="walls cell-container" style={{ height: this.props.cellSize, width: this.props.cellSize}}>
            {Array(this.props.width).fill(1).map((el, i) =>
                <Wall
                    key={1000 * i}
                    location={new Lattice.Cell(i, 0)}>
                </Wall>
            )}
            {Array(this.props.width).fill(1).map((el, i) =>
                <Wall
                    key={1000 * i + this.props.height}
                    location={new Lattice.Cell(i, this.props.height - 1)}>
                </Wall>
            )}
            {Array(this.props.height - 2).fill(1).map((el, j) =>
                <Wall
                    key={j}
                    location={new Lattice.Cell(0, j + 1)}>
                </Wall>
            )}
            {Array(this.props.height - 2).fill(1).map((el, j) =>
                <Wall
                    key={1000 * this.props.width + j}
                    location={new Lattice.Cell(this.props.width - 1, j + 1)}>
                </Wall>
            )}
        </div>);
    }
}
