import * as Lattice from '../Lattice';
import { Snake } from './Snake';

export class SnakeGame {

    snake: Snake;

    constructor(initialFacing: Lattice.Direction) {
        this.snake =  new Snake(initialFacing)
    }
}
