import * as React from 'react';

import * as Lattice from '../Lattice';

import { CellContainer } from './CellContainer';
import { SimpleCell } from './SimpleCell';

export interface FoodControllerProps {
    foodResource: () => Lattice.Cell[],
    cellSize: string
}

export interface FoodControllerState {
    foodPositions: Lattice.Cell[]
}

export class FoodController extends React.PureComponent<FoodControllerProps, FoodControllerState> {

    timer: any;

    constructor(props: FoodControllerProps) {
        super(props);

        const foodPositions = props.foodResource();
        this.state = { foodPositions: foodPositions.slice() };
    }

    componentDidMount() {
        // simulate logic for checking for updates on the server, only re-rendering afterward.
        // This is hideous and shouldn't happen in real code
        // Because we're changing state, we must wait for component mount rather than just object construction.
        this.timer = setInterval(() => {
            const newFood = this.props.foodResource();
            const oldFood = this.state.foodPositions;
            if (this.checkForUpdate(newFood, oldFood)) {
                this.setState({ foodPositions: newFood.slice() });
            }
        }, 100);
    }

    componentDidUnmount() {
        clearInterval(this.timer);
    }

    private checkForUpdate(newFood: Lattice.Cell[], oldFood: Lattice.Cell[]): boolean {
        return JSON.stringify(newFood) !== JSON.stringify(oldFood);
    }

    render(): JSX.Element {
        return (<Foods cellSize={this.props.cellSize} foodPositions={this.state.foodPositions} />);
    }
}

interface FoodsProps {
    foodPositions: Lattice.Cell[],
    cellSize: string
}

function Foods(props: FoodsProps): JSX.Element {
    return (
        <CellContainer cellSize={props.cellSize}>
            {props.foodPositions.map(foodPosition =>
                <SimpleCell
                    key={1000 * foodPosition.x + foodPosition.y}
                    additionalClasses="food"
                    url="img/food.png"
                    location={foodPosition}/>
            )}
        </CellContainer>
    );
}
