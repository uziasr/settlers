import { Lobby } from 'boardgame.io/react';
import { Catan } from './Game';
import GameBoard  from './components/GameBoard';

const Lob =  <Lobby
  gameServer={`https://${window.location.hostname}:8000`}
  lobbyServer={`https://${window.location.hostname}:8000`}
  gameComponents={[
    { game: Catan, board: GameBoard }
  ]}
/>

export default Lob
