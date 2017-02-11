import * as React from 'react';

import * as Lattice from '../Lattice';

import { FoodCell } from './FoodCell';

export interface FoodControllerProps {
    foodResource: () => Lattice.Cell[],
    cellSize: string
}

export interface FoodControllerState {
    foodPositions: Lattice.Cell[]
}

export class FoodController extends React.Component<FoodControllerProps, FoodControllerState> {

    constructor(props: FoodControllerProps) {
        super(props);

        const foodPositions = props.foodResource();
        this.state = { foodPositions: foodPositions };
        // simulate logic for checking for updates on the server, only re-rendering afterward.
        setInterval(() => {
            const newFood = props.foodResource();
            if (this.checkForUpdate(newFood)) {
                this.setState({ foodPositions: props.foodResource() });
            }
        }, 100);
    }

    private checkForUpdate(newFood: Lattice.Cell[]): boolean {
        return JSON.stringify(newFood) !== JSON.stringify(this.state.foodPositions);
    }

    render(): JSX.Element {
        return (<div className="foods cell-container" style={{ height: this.props.cellSize, width: this.props.cellSize}}>
                    {this.state.foodPositions.map(foodPosition =>
                        <FoodCell
                            key={1000 * foodPosition.x + foodPosition.y}
                            size={this.props.cellSize}
                            location={foodPosition}/>
                    )}
                </div>);
    }
}
