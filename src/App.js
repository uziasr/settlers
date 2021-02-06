import { Client } from 'boardgame.io/react';
import { Catan } from './Game';
import GameBoard from "./components/GameBoard"
import { SocketIO } from 'boardgame.io/multiplayer'






const App = Client({ 
    game: Catan, 
    board: GameBoard,
    multiplayer: SocketIO({server: "localhost:8000"})
});


export default App;