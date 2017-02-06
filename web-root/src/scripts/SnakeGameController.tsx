import * as React from "react";
import * as ReactDOM from "react-dom";

import { SnakeGame } from "./components/SnakeGame";

ReactDOM.render(
    <SnakeGame arenaWidth={10} arenaHeight={10} initialDirection="right" />,
    document.getElementById("gameContainer")
);
