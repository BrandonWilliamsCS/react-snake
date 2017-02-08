import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Lattice from './Lattice';
import { SnakeGame } from './model/SnakeGame';
import { SnakeGame as SnakeGameView } from './components/SnakeGame';

// As these aren't being exported, they're not going to clutter up a "global" "namespace".
const LEFT_KEY_CODE = 37;
const UP_KEY_CODE = 38;
const RIGHT_KEY_CODE = 39;
const DOWN_KEY_CODE = 40;

const LEFT_KEY = 'a';
const UP_KEY = 'w';
const RIGHT_KEY = 'd';
const DOWN_KEY = 's';

var direction: Lattice.Direction = 'right';
var gameView: SnakeGameView;
var gameModel: SnakeGame;

function handleKeyDown(evt: React.KeyboardEvent<any>): void {
    if (evt.keyCode == UP_KEY_CODE || evt.key == UP_KEY) direction = 'up'
    else if (evt.keyCode == DOWN_KEY_CODE || evt.key == DOWN_KEY) direction = 'down'
    else if (evt.keyCode == LEFT_KEY_CODE || evt.key == LEFT_KEY) direction = 'left'
    else if (evt.keyCode == RIGHT_KEY_CODE || evt.key == RIGHT_KEY) direction = 'right'

    gameView.updateFacing(direction);
}

ReactDOM.render(
    <SnakeGameView arenaWidth={10}
        arenaHeight={10}
        facing={direction}
        handleKeyDown={handleKeyDown}
        ref={(snakeGameView) => { gameView = snakeGameView }}/>,
    document.getElementById('gameContainer')
);
