import { INVALID_MOVE } from 'boardgame.io/core';
import { board, Player } from "./components/gameLogic"

export const Catan = {
  name: "settlers",

  setup: (ctx, setupData) => {
    // generate 20 tiles for each tile type
    const tiles = board.tiles
    const scoreboard = {};
    const players = [new Player("bill", "white"), new Player("Alex", "red"), new Player("Fern", "blue"), new Player("Daren", "orange")]
    ctx.players = players
    ctx.playOrder = {
      0: players[0],
      1: players[1],
      2: players[2],
      3: players[3],
    }
    ctx.numPlayers = 4
    console.log(ctx)
    const nodes = board.graph.adjList
    const initialState = {
      // tilesInPool: updatedTilesInPool,
      // usedTiles: updatedUsedTiles,
      // tileGroups,
      // beginTileOwner: null,
      // scoreboard,
      // tileMiddleGroup: [],
      // players,
      // shouldEndGame: false,
      tiles: tiles,
      nodes: nodes,
    };
    return initialState;
  },
  moves: {
    buildRoad: {
      move: (G, ctx, ...args) => { },
      undoable: true,

    },
    buildSettlement: (G, ctx, node) => {
        // console.log("this is node", G, ctx, node)
        node.placement = ctx.currentPlayer
        node.canBuild = false
        let adjacentNodes = board.graph.adjList.get(node)
        adjacentNodes.forEach(adjacentNode=>adjacentNode.canBuild = false)
        adjacentNodes.forEach(adjacentNode=>console.log(adjacentNode))

    },
    buildCity: () => {

    },
    getDevelopmentCard: () => {

    },
    roll: () => {

    },
    initiateTrade: (drop = false) => {

    },
    tradeResponse: (counterOffer, accept = null, decline = false) => {

    },

  },
  minPlayers: 4
}
//   setup: () => ({ cells: Array(9).fill(null) }),

//   moves: {
//     clickCell: (G, ctx, id) => {
//       if (G.cells[id] !== null) {
//         return INVALID_MOVE
//       }
//       G.cells[id] = ctx.currentPlayer;
//     },
//   },
//   turn: {
//     moveLimit: 1
//   },
//   endIf: (G, ctx) => {
//     if (IsVictory(G.cells)) {
//       return { winner: ctx.currentPlayer };
//     }
//     if (IsDraw(G.cells)) {
//       return { draw: true };
//     }
//   },
//   minPlayers: 3,
//     maxPlayers: 4,
//       ctx: {
//     turn: 0,
//       currentPlayer: '0',
//         numPlayers: 4,
// }

// // Return true if all `cells` are occupied.
// function IsDraw(cells) {
//   return cells.filter(c => c === null).length === 0;


function IsVictory(cells) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}
