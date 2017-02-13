import * as React from 'react';

import * as Lattice from '../Lattice';

import { SnakeHeadCell } from './SnakeHeadCell';
import { SnakeBodyCell } from './SnakeBodyCell';
import { SnakeTailCell } from './SnakeTailCell';

export interface SnakeProps {
    snake: Lattice.Path,
    cellSize: string
}

export class Snake extends React.Component<SnakeProps, undefined> {

    render(): JSX.Element {
        const tailPathCell = this.props.snake.last();
        return (<div className="snake cell-container" style={{ height: this.props.cellSize, width: this.props.cellSize}}>
                    {/* JSX allows any expression within {}. This then leverages js short-circuiting "&&". */}
                    {this.props.snake.size > 1 &&
                        <SnakeTailCell
                            size={this.props.cellSize}
                            pathCell={this.props.snake.last()}/>
                    }
                    {this.props.snake.size > 2 && this.props.snake.map((pathCell, i) => {
                        // pathCell has type "PathCell | undefined". TS requires this not-undefined check,
                        // but is also smart enough to know that within the tag. Like Swift "if let pathCell = pathCell"
                        if (i > 0 && i < this.props.snake.size -1 && pathCell) {
                            return <SnakeBodyCell
                                    key={1000 * pathCell.location.x + pathCell.location.y}
                                    size={this.props.cellSize}
                                    pathCell={pathCell}/>
                        } else {
                            return undefined;
                        }
                    })}
                    <SnakeHeadCell
                        size={this.props.cellSize}
                        pathCell={this.props.snake.first()}/>
                </div>);
    }
}
