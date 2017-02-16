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
    gameOver: boolean;
    score: number = 0;
    foodPositions: Lattice.Cell[] = [];

    constructor(settings: GameSettings) {
        this.settings = settings;
        this.snake = new Snake(settings.initialFacing, settings.initialPosition);
    }

    reset() {
        this.snake = new Snake(this.settings.initialFacing, this.settings.initialPosition);
        this.gameOver = false;
        this.score = 0;
        this.generateFood();
    }

    advance(direction: Lattice.Direction) {
        this.snake = this.snake.grown(direction);

        if (this.checkSnakeEating()) {
            this.generateFood();
        } else {
            this.snake = this.snake.shrunken();
        }
        if (this.snake.headPosition.x < 0 || this.snake.headPosition.x >= this.settings.arenaSize.width
            || this.snake.headPosition.y < 0 || this.snake.headPosition.y >= this.settings.arenaSize.height
            || this.snake.isOverlappingAt(this.snake.headPosition)) {
                this.gameOver = true;
        }
    }

    generateFood() {
        // allow multiple seeds by calculating this number
        while (this.foodPositions.length < 1) {
            this.foodPositions.push(this.getRandomEmptyCell());
        }
    }

    getRandomEmptyCell(): Lattice.Cell {
        let position = this.snake.headPosition;
        while (this.snake.isOccupying(position)) // TODO: make sure there isn't already food here.
        {
            let x = Math.floor(Math.random() * this.settings.arenaSize.width);
            let y = Math.floor(Math.random() * this.settings.arenaSize.height);
            position = new Lattice.Cell(x, y);
        }
        return position;
    }

    checkSnakeEating(): boolean {
        const foodIndex = this.foodPositions.findIndex(food =>
            food.x == this.snake.headPosition.x && food.y == this.snake.headPosition.y
        );
        if (foodIndex < 0) return false;
        this.foodPositions.splice(foodIndex, 1);
        this.score++;
        return true;
    }

    getSnakePath(): Lattice.Path {
        return this.snake.getPath();
    }

    // Allow for variable snake speed, increasing with score.
    getTickLength(): number {
        return this.settings.initialTickLength / Math.sqrt(this.score + 1);
    }
}
