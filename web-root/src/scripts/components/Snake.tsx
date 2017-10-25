import * as React from 'react';

import * as Lattice from '../Lattice';

import { CellContainer } from './CellContainer';
import { SnakeHeadCell } from './SnakeHeadCell';
import { SnakeBodyCell } from './SnakeBodyCell';
import { SnakeTailCell } from './SnakeTailCell';

export interface SnakeProps {
    snake: Lattice.Path,
    cellSize: string
}

export class Snake extends React.PureComponent<SnakeProps, {}> {

    render(): JSX.Element {
        const tailPathCell = this.props.snake.last();
        return (<CellContainer cellSize={this.props.cellSize}>
                    {/* JSX allows any expression within {}. This then leverages js short-circuiting "&&". */}
                    {this.props.snake.size > 1 &&
                        <SnakeTailCell
                            pathCell={this.props.snake.last()}/>
                    }
                    {this.props.snake.size > 2 && this.props.snake.map((pathCell, i) => {
                        // pathCell has type "PathCell | undefined". TS requires this not-undefined check,
                        // but is also smart enough to know that within the tag. Like Swift "if let pathCell = pathCell"
                        if (i && i > 0 && i < this.props.snake.size -1 && pathCell) {
                            return <SnakeBodyCell
                                    key={1000 * pathCell.location.x + pathCell.location.y}
                                    pathCell={pathCell}/>
                        } else {
                            return undefined;
                        }
                    })}
                    <SnakeHeadCell
                        pathCell={this.props.snake.first()}/>
                </CellContainer>);
    }
}
