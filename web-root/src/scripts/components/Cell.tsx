import * as React from 'react';

import * as Lattice from '../Lattice';

export interface CellProps {
    size: string
}

export abstract class Cell<P extends CellProps> extends React.Component<P, undefined> {
    protected abstract getImageUrl(): string;
    protected readonly abstract latticePosition: Lattice.Cell;

    render(): JSX.Element {
        function toPercent(value: number): string {
            return value + '00%';
        }
        return (<div
                    className="cell"
                    style={{
                        height: this.props.size,
                        width: this.props.size,
                        left: toPercent(this.latticePosition.x + 1),
                        bottom: toPercent(this.latticePosition.y + 1)
                    }}>
                    <img src={this.getImageUrl()} />
                </div>);
    }
}
