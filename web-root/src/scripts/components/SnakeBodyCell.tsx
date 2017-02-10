import * as React from 'react';

import * as Lattice from '../Lattice';

import { SnakeCell, SnakeCellProps } from './SnakeCell';

export class SnakeBodyCell extends SnakeCell<SnakeCellProps> {

    protected getImageUrl(): string {
        if (this.props.pathCell.entryDirection == this.props.pathCell.exitDirection)
            return 'img/snake_segment_' + this.props.pathCell.exitDirection + '.png';
        else
            return 'img/snake_bend_' + this.props.pathCell.entryDirection + '_' + this.props.pathCell.exitDirection + '.png';
    }

    // render exists in base class
}
