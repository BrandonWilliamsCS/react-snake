import * as Immutable from 'immutable'

// This is a "string literal" type. It's like an enum, but it's a subtype of string.
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Size {
    width: number,
    height: number
}

export class Cell {
    readonly x: number;
    readonly y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    located(direction: Direction, distance: number = 1): Cell {
        let newDimension: number;
        // switch on a string literal type is smart;
        // it restricts to to the right values, and knows when you've hit every case.
        switch (direction) {
        case 'up':
            newDimension = this.y - distance;
            return new Cell(this.x, newDimension);
        case 'down':
            newDimension = this.y + distance;
            return new Cell(this.x, newDimension);
        case 'left':
            newDimension = this.x - distance;
            return new Cell(newDimension, this.y);
        case 'right':
            newDimension = this.x + distance;
            return new Cell(newDimension, this.y);
        }
    }

    // this return type allows "undefined" for the case where no direction fits.
    directionTo(otherCell: Cell): Direction | undefined {
        if (this.x != otherCell.x && this.y != otherCell.y) return undefined;

        if (this.x == otherCell.x) {
            if (this.y < otherCell.y) {
                return 'down';
            } else if (this.y > otherCell.y) {
                return 'up';
            } else {
                return undefined;
            }

        } else if (this.y == otherCell.y) {
            if (this.x < otherCell.x) {
                return 'right';
            } else if (this.x > otherCell.x) {
                return 'left';
            }
        }
        return undefined;
    }

    static equals(left: Cell, right: Cell): boolean {
        return left.x == right.x && left.y == right.y;
    }
}

export interface PathCell {
    readonly location: Cell;
    readonly entryDirection: Direction;
    readonly exitDirection: Direction;
}

export type Path = Immutable.List<PathCell>
