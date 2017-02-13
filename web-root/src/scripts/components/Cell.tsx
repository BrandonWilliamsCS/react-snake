import * as React from 'react';

import * as Lattice from '../Lattice';

export interface CellProps {
    additionalClasses?: string
}

export abstract class Cell<P extends CellProps> extends React.Component<P, undefined> {

    protected abstract getImageUrl(): string;
    protected readonly abstract latticePosition: Lattice.Cell;

    render(): JSX.Element {
        function toPercent(value: number): string {
            return value + '00%';
        }
        var className = this.props.additionalClasses ? 'cell ' + this.props.additionalClasses : 'cell';
        return (<div
                    className={className}
                    style={{
                        left: toPercent(this.latticePosition.x + 1),
                        bottom: toPercent(this.latticePosition.y + 1)
                    }}>
                    <img src={this.getImageUrl()} />
                </div>);
    }
}
