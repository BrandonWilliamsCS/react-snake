import * as React from 'react';

import * as Lattice from '../Lattice';

import { Snake } from './Snake';
import { Walls } from './Walls';

export interface ArenaProps {
    width: number,
    height: number,
    snake: Lattice.Path
}

export class Arena extends React.Component<ArenaProps, undefined> {

    render(): JSX.Element {
        var gridHeight = '(100vh - 50px)';
        var gridWidth = 'calc(' + gridHeight + ' * ' + (this.props.width + 2) + ' / ' + (this.props.height + 2) + ')';
        var cellSize = 'calc(' + gridHeight + ' / ' + (this.props.height + 2) + ')';
        gridHeight = 'calc(' + gridHeight + ')';
        return (
            <div className="arena">
                <div className="grid" style={{height:gridHeight, width:gridWidth}}>
                    <Walls width={this.props.width + 2} height={this.props.height + 2} cellSize={cellSize} />
                    <Snake snake={this.props.snake} cellSize={cellSize} />
                </div>
            </div>
        );
    }
}
