import * as React from 'react';

import * as Lattice from '../Lattice';

import { SnakeCell, SnakeCellProps } from './SnakeCell';

export class SnakeTailCell extends SnakeCell<SnakeCellProps> {

    protected getImageUrl(): string {
        return 'img/snake_tail_' + this.props.pathCell.exitDirection + '.png';
    }

    // render exists in base class
}
