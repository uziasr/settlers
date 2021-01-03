import { Client } from 'boardgame.io/react';
import { Catan } from './Game';
import { TicTacToeBoard } from "./Board"
import GameBoard from "./components/GameBoard"

// import { h3ToGeo } from "h3-js";

// console.log(h3ToGeo)

// const App = Client({ game: Catan, board: TicTacToeBoard });
const App = Client({ game: Catan, board: GameBoard, numPlayers: 4, });


export default App;