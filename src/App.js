import { Client } from 'boardgame.io/react';
import { Catan } from './Game';
import { TicTacToeBoard } from "./Board"
import HexGrid from "./HexGrid"
// import { h3ToGeo } from "h3-js";

// console.log(h3ToGeo)

// const App = Client({ game: Catan, board: TicTacToeBoard });
const App = () => (<HexGrid/>)


export default App;