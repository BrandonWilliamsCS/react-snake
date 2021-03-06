import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Lattice from './Lattice';

import { SnakeGame } from './model/SnakeGame';
// Because someone foolishly named both types "SnakeGame", we can/have to change what we call the second one.
import { SnakeGame as SnakeGameView, SnakeGameProps } from './components/SnakeGame';

// As these aren't being exported, they're not going to clutter up a "global" "namespace".
// Alternatively, we may want to look into adding them to a utils file for keyboard input, etc.
const LEFT_KEY_CODE = 37;
const UP_KEY_CODE = 38;
const RIGHT_KEY_CODE = 39;
const DOWN_KEY_CODE = 40;
const LEFT_KEY = 'a';
const UP_KEY = 'w';
const RIGHT_KEY = 'd';
const DOWN_KEY = 's';

// Game configuration -
// Note the type inference (number, number, number, Lattice.Cell)
const arenaWidth = 12;
const arenaHeight = 10;
const initialTickLength = 0.5;
const start = new Lattice.Cell(2, 2);

// Explicit type declaration here to ensure that only a Lattice.Direction string can be assigned.
var direction: Lattice.Direction = 'right';
// here, though, we don't need to import SnakeGame.GameSettings.
// Both that and the arenaSize have their types inferred (and they are still checked).
// Note that, although Size is readonly, this implicit implementation can still modify width/height. SnakeGame can't.
const settings = {
    arenaSize: { width: arenaWidth, height: arenaHeight },
    initialFacing: direction,
    initialPosition: start,
    initialTickLength: initialTickLength
};

// the view will be set by the "ref" attribute of the tag, below
var gameView: SnakeGameView;
var gameModel = new SnakeGame(settings);

function handleKeyDown(evt: React.KeyboardEvent<any>): void {
    if (evt.keyCode == UP_KEY_CODE || evt.key == UP_KEY) direction = 'up'
    else if (evt.keyCode == DOWN_KEY_CODE || evt.key == DOWN_KEY) direction = 'down'
    else if (evt.keyCode == LEFT_KEY_CODE || evt.key == LEFT_KEY) direction = 'left'
    else if (evt.keyCode == RIGHT_KEY_CODE || evt.key == RIGHT_KEY) direction = 'right'
}

var timer;
function handleStartClick(evt: React.MouseEvent<any>): void {
    direction = 'right';
    gameModel.reset();
    gameView.startGame();
    timer = setTimeout(advance, 1000 * gameModel.getTickLength());
}

function advance() {
    gameModel.advance(direction);
    const snakePath = gameModel.getSnakePath();
    gameView.nextFrame(snakePath, gameModel.score);
    // if the game is done, skip further processing.
    if (gameModel.gameOver) {
        gameView.endGame();
        return;
    }
    timer = setTimeout(advance, 1000 * gameModel.getTickLength());
}

function fakeServerCall(): Lattice.Cell[] {
    return gameModel.foodPositions;
}

const gameViewProps: SnakeGameProps = {
    arenaWidth: arenaWidth,
    arenaHeight: arenaHeight,
    snakePath: gameModel.getSnakePath(),
    handleKeyDown: handleKeyDown,
    handleStartClick: handleStartClick,
    foodResource: fakeServerCall
}

ReactDOM.render(
    <SnakeGameView
        {...gameViewProps}
        ref={(snakeGameView) => { gameView = snakeGameView! }}/>,
    document.getElementById('gameContainer')
);
