import * as React from 'react';

import * as Lattice from '../Lattice';

import { Cell, CellProps } from './Cell';

export interface FoodCellProps extends CellProps {
    location: Lattice.Cell
}

export abstract class FoodCell extends Cell<FoodCellProps> {

    protected getImageUrl(): string {
        return 'img/food.png';
    }

    protected get latticePosition(): Lattice.Cell {
        return this.props.location;
    }

    // render exists in base class
}
