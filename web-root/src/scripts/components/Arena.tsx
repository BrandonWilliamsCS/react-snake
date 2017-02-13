import * as React from 'react';

import * as Lattice from '../Lattice';

import { FoodController } from './FoodController';
import { Snake } from './Snake';
import { Walls } from './Walls';

export interface ArenaProps {
    width: number,
    height: number,
    snake: Lattice.Path,
    foodResource: () => Lattice.Cell[]
}

export class Arena extends React.Component<ArenaProps, undefined> {

    render(): JSX.Element {
        let gridHeight = '(100vh - 50px)';
        const gridWidth = 'calc(' + gridHeight + ' * ' + (this.props.width + 2) + ' / ' + (this.props.height + 2) + ')';
        const cellSize = 'calc(' + gridHeight + ' / ' + (this.props.height + 2) + ')';
        gridHeight = 'calc(' + gridHeight + ')';
        return (
            <div className="arena">
                <div className="grid" style={{height:gridHeight, width:gridWidth}}>
                    <Walls width={this.props.width + 2} height={this.props.height + 2} cellSize={cellSize} />
                    <FoodController foodResource={this.props.foodResource} cellSize={cellSize} />
                    <Snake snake={this.props.snake} cellSize={cellSize} />
                </div>
            </div>
        );
    }
}
