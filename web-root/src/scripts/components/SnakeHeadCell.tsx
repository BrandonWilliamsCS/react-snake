import * as React from 'react';

import * as Lattice from '../Lattice';

import { SnakeCell, SnakeCellProps } from './SnakeCell';

export interface SnakeHeadCellProps extends SnakeCellProps {
    smushed?: boolean
}

export class SnakeHeadCell extends SnakeCell<SnakeHeadCellProps> {

    protected getImageUrl(): string {
        return 'img/snake_head_' + this.props.pathCell.exitDirection + '.png';
    }

    // render exists in base class
}
