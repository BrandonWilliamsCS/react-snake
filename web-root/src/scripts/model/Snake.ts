import * as Immutable from 'immutable'
import * as Lattice from '../Lattice';

export class Snake {

    private readonly bodySegments: Immutable.List<SnakeSegment>;
    readonly headPosition: Lattice.Cell;

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

    isOverlappingAt(cell: Lattice.Cell): boolean {
        return this.bodySegments.toSeq().filter((segment: SnakeSegment) => segment.isOccupying(cell)).count() > 1;
    }

    getPath(): Lattice.Path {
        // Ignore the headmost cell of every segment; that will be covered by the start of the next segment.
        let prevExitDirection: Lattice.Direction = this.getTailFacing();
        const withoutHead = this.bodySegments.reverse().flatMap(bodySegment => {
            const pathCells: Lattice.PathCell[] = [];
            if (bodySegment) {
                for (let i = 0; i < bodySegment.length - 1; ++i) {
                    pathCells.push({
                        location: bodySegment.getNth(i),
                        entryDirection: i == 0 ? prevExitDirection : bodySegment.growDirection,
                        exitDirection: bodySegment.growDirection
                    });
                }
                prevExitDirection = bodySegment.growDirection;
            }
            return Immutable.List(pathCells);
        });

        // now that we have all but the first cell of the first segment, add that.
        const lastSegment = this.bodySegments.first();
        const headCell: Lattice.PathCell = {
            location: lastSegment.endCell,
            entryDirection: lastSegment.growDirection,
            exitDirection: lastSegment.growDirection
        };
        const fullPath = withoutHead.concat(headCell).reverse();
        return Immutable.List<Lattice.PathCell>(fullPath);
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
        // get rid of the tail-most segment if it's obsolete, and shink whatever the new tail is.
        let newBodySegments: Immutable.List<SnakeSegment> = this.bodySegments;
        if (this.bodySegments.size > 1 && this.bodySegments.last().length == 1) {
            newBodySegments = newBodySegments.pop();
        }
        newBodySegments = newBodySegments.update(-1, tail => tail.shrunken());
        // up is ignored in the constructor since the body segments are provided. In a real product, we'd fix that.
        return new Snake('up', this.headPosition, newBodySegments);
    }
}

class SnakeSegment {

    readonly endCell: Lattice.Cell;

    constructor(readonly startCell: Lattice.Cell, readonly growDirection: Lattice.Direction, readonly length: number = 1) {
        this.endCell = startCell.located(growDirection, length - 1);
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

    getNth(n: number): Lattice.Cell {
        return this.startCell.located(this.growDirection, n);
    }

    grown(): SnakeSegment {
        return new SnakeSegment(this.startCell, this.growDirection, this.length + 1);
    }

    shrunken(): SnakeSegment {
        return new SnakeSegment(this.startCell.located(this.growDirection), this.growDirection, this.length - 1);
    }
}
