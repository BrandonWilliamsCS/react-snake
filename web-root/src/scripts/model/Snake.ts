import * as Immutable from 'immutable'
import * as Lattice from '../Lattice';

export class Snake {

    private bodySegments: Immutable.List<SnakeSegment>;
    headPosition: Lattice.Cell;

    constructor(initialFacing: Lattice.Direction, initialPosition: Lattice.Cell, bodySegments?: Immutable.List<SnakeSegment>) {
        // This is unideal, since it's somewhat exposing its internals
        // In other languages this would be its own private constructor instead. Oh well.
        if (bodySegments) {
            this.bodySegments = bodySegments;
        } else {
            this.bodySegments = Immutable.List<SnakeSegment>([new SnakeSegment(initialPosition, initialFacing)]);
        }
        this.headPosition = initialPosition;
    }

    getCurrentFacing(): Lattice.Direction {
        return this.bodySegments.first().growDirection;
    }

    getTailFacing(): Lattice.Direction {
        return this.bodySegments.last().growDirection;
    }

    isOccupying(cell: Lattice.Cell): boolean {
        // converting to sequence makes these functions "lazy", applying them only at the end.
        // Then, calling .IsEmpty() only runs the filter enough until something passes the fitler, rather than the whole stream.
        // Like Linq in C#, streams in java 8, and LazySequence in Swift 3.
        return !this.bodySegments.toSeq().filter((segment: SnakeSegment) => segment.isOccupying(cell)).isEmpty();
    }

    // getPath(): Immutable.List<Lattice.PathCell> {
    //
    // }

    moved(direction: Lattice.Direction): Snake {
        if (this.bodySegments.size != 1 || this.bodySegments.first().length != 1) {
            throw new Error('Can\'t move non-trivial snake body.');
        }
        if (this.bodySegments.first().growDirection != direction) {
            const newBodySegments = this.bodySegments.update(0, prev => new SnakeSegment(prev.startCell, direction));
            const newPosition = this.headPosition.located(direction);
            return new Snake(direction, newPosition, newBodySegments);
        }
        return this;
    }

    grown(direction: Lattice.Direction) {
        const first = this.bodySegments.first();
        const newBodySegments = first.growDirection == direction
            ? this.bodySegments.update(0, prev => new SnakeSegment(prev.startCell, direction, first.length + 1))
            : this.bodySegments.unshift(new SnakeSegment(this.headPosition, direction, 2));
        const newPosition = this.headPosition.located(direction);
        return new Snake(direction, newPosition, newBodySegments);
    }

    shrunken() {
        // get rid of the tail-most segment if it's obsolete, but otherwise replace.
        let newBodySegments: Immutable.List<SnakeSegment>;
        if (this.bodySegments.size > 0 && this.bodySegments.last().length == 1) {
            newBodySegments = this.bodySegments.pop();
        } else {
            newBodySegments = this.bodySegments.update(-1,
                tail => new SnakeSegment(tail.startCell, tail.growDirection, tail.length - 1));
        }
        // up is ignored in the constructor since the body segments are provided. In a real product, we'd fix that.
        return new Snake('up', this.headPosition, newBodySegments);
    }
}

class SnakeSegment {

    readonly startCell: Lattice.Cell;
    readonly endCell: Lattice.Cell;
    readonly growDirection: Lattice.Direction;
    readonly length: number;

    constructor(startCell: Lattice.Cell, growDirection: Lattice.Direction, length: number = 1) {
        this.length = length;
        this.growDirection = growDirection;
        this.startCell = startCell;
        this.endCell = startCell.located(growDirection, length);
    }

    isOccupying(cell: Lattice.Cell): boolean {
        switch (this.growDirection) {
            case 'up':
                return this.startCell.x == cell.x && this.startCell.y <= cell.y && cell.y <= this.endCell.y
            case 'down':
                return this.startCell.x == cell.x && this.startCell.y >= cell.y && cell.y >= this.endCell.y
            case 'right':
                return this.startCell.y == cell.y && this.startCell.x <= cell.x && cell.x <= this.endCell.x
            case 'left':
                return this.startCell.y == cell.y && this.startCell.x >= cell.x && cell.x >= this.endCell.x
        }
    }

    grown(): SnakeSegment {
        return new SnakeSegment(this.startCell, this.growDirection, this.length + 1);
    }

    shrunken(): SnakeSegment {
        return new SnakeSegment(this.startCell, this.growDirection, this.length - 1);
    }
}
