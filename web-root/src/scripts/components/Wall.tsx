import * as React from 'react';

import * as Lattice from '../Lattice';

export interface WallProps {
    location: Lattice.Cell
}

export abstract class Wall extends React.Component<WallProps, {}> {

    render(): JSX.Element {
        function toPercent(value: number): string {
            return value + '00%';
        }
        return (<div
                    className="cell wall"
                    style={{
                        left: toPercent(this.props.location.x),
                        bottom: toPercent(this.props.location.y)
                    }}>
                </div>);
    }
}
