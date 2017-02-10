import * as React from 'react';

export interface WallProps {
    width: number,
    height: number,
    cellSize: string
}

export class Walls extends React.Component<WallProps, undefined> {

    // Once the walls are ready, they're permanent. Never bother re-rendering!
    shouldComponentUpdate(): boolean {
        return false;
    }

    render(): JSX.Element {
        function toPercent(value: number): string {
            return value + '00%';
        }

        return (<div className="walls cell-container" style={{ height: this.props.cellSize, width: this.props.cellSize}}>
            {Array(this.props.width).fill(1).map((el, i) =>
                <div
                    className="cell wall"
                    key={1000 * i}
                    style={{ height: this.props.cellSize, width: this.props.cellSize, left: toPercent(i), bottom: 0}}>
                </div>
            )}
            {Array(this.props.width).fill(1).map((el, i) =>
                <div
                    className="cell wall"
                    key={1000 * i + this.props.height}
                    style={{ height: this.props.cellSize, width: this.props.cellSize, left: toPercent(i), bottom: toPercent(this.props.height - 1)}}>
                </div>
            )}
            {Array(this.props.height - 2).fill(1).map((el, j) =>
                <div
                    className="cell wall"
                    key={j}
                    style={{ height: this.props.cellSize, width: this.props.cellSize, left: 0, bottom: toPercent(j + 1)}}>
                </div>
            )}
            {Array(this.props.height - 2).fill(1).map((el, j) =>
                <div
                    className="cell wall"
                    key={1000 * this.props.width + j}
                    style={{ height: this.props.cellSize, width: this.props.cellSize, left: toPercent(this.props.width - 1), bottom: toPercent(j + 1)}}>
                </div>
            )}
        </div>);
    }
}
