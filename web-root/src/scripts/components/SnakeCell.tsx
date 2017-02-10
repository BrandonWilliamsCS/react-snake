import * as React from 'react';

import * as Lattice from '../Lattice';

import { Cell, CellProps } from './Cell';

export interface SnakeCellProps extends CellProps {
    pathCell: Lattice.PathCell
}

export abstract class SnakeCell<P extends SnakeCellProps> extends Cell<P> {

    protected get latticePosition(): Lattice.Cell {
        return this.props.pathCell.location
    }

    constructor(props: P) {
        super(props);
    }

    // render exists in base class
}
