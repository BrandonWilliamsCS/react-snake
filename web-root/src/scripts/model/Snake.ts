import * as Immutable from 'immutable'
import * as Lattice from '../Lattice';

export class Snake {

    private bodySegments: Immutable.List<SnakeSegment>;

    constructor(initialFacing: Lattice.Direction, bodySegments?: Immutable.List<SnakeSegment>) {
        // This is unideal, since it's somewhat exposing its internals
        // In other languages this would be its own private constructor instead. Oh well.
        if (bodySegments) {
            this.bodySegments = bodySegments;
        } else {
            this.bodySegments = Immutable.List<SnakeSegment>([new SnakeSegment(initialFacing)]);
        }
    }

    getCurrentFacing(): Lattice.Direction {
        return this.bodySegments.first().growDirection;
    }

    getTailFacing(): Lattice.Direction {
        return this.bodySegments.last().growDirection;
    }

    moved(direction: Lattice.Direction): Snake {
        if (this.bodySegments.size != 1 || this.bodySegments.first().length != 1) {
            throw new Error('Can\'t move non-trivial snake body.');
        }
        if (this.bodySegments.first().growDirection != direction) {
            const newBodySegments = this.bodySegments.update(0, _ => new SnakeSegment(direction));
            return new Snake(direction, newBodySegments);
        }
        return this;
    }

    grown(direction: Lattice.Direction) {
        const first = this.bodySegments.first();
        const newBodySegments = first.growDirection == direction
            ? this.bodySegments.update(0, _ => new SnakeSegment(direction, first.length + 1))
            : this.bodySegments.unshift(new SnakeSegment(direction, 2));
        return new Snake(direction, newBodySegments);
    }

    shrunken() {
        // get rid of the tail-most segment if it's obsolete, but otherwise replace.
        let newBodySegments: Immutable.List<SnakeSegment>;
        if (this.bodySegments.size > 0 && this.bodySegments.last().length == 1) {
            newBodySegments = this.bodySegments.pop();
        } else {
            newBodySegments = this.bodySegments.update(-1, tail => new SnakeSegment(tail.growDirection, tail.length - 1));
        }
        // up is ignored in the constructor since the body segments are provided. In a real product, we'd fix that.
        return new Snake('up', newBodySegments);
    }
}

class SnakeSegment {

    readonly growDirection: Lattice.Direction;
    readonly length: number;

    constructor(growDirection: Lattice.Direction, length: number = 1) {
        this.length = length;
        this.growDirection = growDirection;
    }

    grown(): SnakeSegment {
        return new SnakeSegment(this.growDirection, this.length + 1);
    }

    shrunken(): SnakeSegment {
        return new SnakeSegment(this.growDirection, this.length - 1);
    }
}
