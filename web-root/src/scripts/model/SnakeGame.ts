import * as Lattice from '../Lattice';
import { Snake } from './Snake';

// doesn't need to be exported to be type-checked!
// It probably should be exported anyway, so the interface can be used explicitly and before it needs to be.
interface GameSettings {
    arenaSize: Lattice.Size
    initialFacing: Lattice.Direction,
    initialPosition: Lattice.Cell
    initialTickLength: number
}

export class SnakeGame {
    readonly settings: GameSettings;
    private snake: Snake;
    score: number = 0;
    foodPositions: Lattice.Cell[] = [];

    constructor(settings: GameSettings) {
        this.settings = settings;
        this.snake = new Snake(settings.initialFacing, settings.initialPosition);
    }

    advance(direction: Lattice.Direction) {
        console.log('advancing: ' + direction);
        this.snake = this.snake.grown(direction);
        // TODO: check for food
    }

    getSnakePath(): Lattice.Path {
        return this.snake.getPath();
    }

    // Allow for variable snake speed, increasing with score. Probably log(score) * 0.5
    getTickLength(): number {
        return this.settings.initialTickLength;
    }
}
