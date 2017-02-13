import * as React from 'react';

import * as Lattice from '../Lattice';

export interface CellContainerProps {
    cellSize: string
}

export class CellContainer extends React.Component<CellContainerProps, undefined> {

    render(): JSX.Element {
        return (<div className="cell-container" style={{ height: this.props.cellSize, width: this.props.cellSize}}>
                    {this.props.children}
                </div>);
    }
}
