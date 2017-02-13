import * as React from 'react';

import * as Lattice from '../Lattice';

import { Cell, CellProps } from './Cell';

export interface SimpleCellProps extends CellProps {
    url: string,
    location: Lattice.Cell
}

export abstract class SimpleCell extends Cell<SimpleCellProps> {

    protected getImageUrl(): string {
        return this.props.url;
    }

    protected get latticePosition(): Lattice.Cell {
        return this.props.location;
    }

    // render exists in base class
}
