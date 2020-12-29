import { INVALID_MOVE } from 'boardgame.io/core';
import { board, Player } from "./components/gameLogic"

const moves = {
  initialRoll: (G, ctx, roll) => {
    let establishingOrder = { ...G.establishingOrder }
    if (roll > establishingOrder.highestRoll) {
      establishingOrder.highestRoll = roll
      establishingOrder.playerIndex = ctx.currentPlayer
    }
    if (ctx.currentPlayer == "3") {
      establishingOrder.iterations = 1
      let players = [...G.players]
      let newOrder = [...players.slice(Number(G.establishingOrder.playerIndex), 4), ...players.slice(0, Number(G.establishingOrder.playerIndex))]
      let playOrder = {
        0: newOrder[0],
        1: newOrder[1],
        2: newOrder[2],
        3: newOrder[3]
      }
      ctx.events.endTurn()
      return { ...G, playOrder: playOrder, establishingOrder: establishingOrder }
    }
    ctx.events.endTurn()
    return { ...G, establishingOrder }
  },
  initialPlacements: (G, ctx, node) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    if (node.canBuild) {
      node.placement = currentPlayer.settlements.pop()
      currentPlayer.points++
      node.canBuild = false
      if (G.initialPlacementsCount >= G.players.length) {
        node.yields.forEach(resource => currentPlayer.cards[resource] !== undefined ? currentPlayer.cards[resource]++ : null)
        console.log(currentPlayer)
      }
    } else {
      return INVALID_MOVE
    }
    let adjacentNodes = board.graph.adjList.get(node)
    adjacentNodes.forEach(adjacentNode => adjacentNode.canBuild = false)
    ctx.events.setActivePlayers({ currentPlayer: "initialRoad" })
    console.log(G.settlements[ctx.currentPlayer], ctx.currentPlayer)
    return { ...G, settlements: { ...G.settlements, [ctx.currentPlayer]: [...G.settlements[ctx.currentPlayer], node] } }
  },
  placeRoad: (G, ctx, node) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    let currentSettlements = [...G.settlements[ctx.currentPlayer]]
    console.log(currentSettlements)
    if (!board.graph.adjList.get(currentSettlements[currentSettlements.length - 1]).includes(node)) {
      console.log(board.graph.adjList.get(currentSettlements[currentSettlements.length - 1]).forEach(n => console.log(n, node, n === node)))
      return INVALID_MOVE
    }
    // const settlements = [...currentPlayer.settlements[currentPlayer]]
    const currentSettlement = currentSettlements[currentSettlements.length - 1]
    board.connectRoad(currentSettlement, node, currentPlayer.roads.pop())

    if (G.initialPlacementsCount === G.players.length - 1) {
      ctx.events.endTurn()
      ctx.events.setActivePlayers({ currentPlayer: "initialSettlement" })
      return {
        ...G, playOrder: {
          0: G.playOrder[3],
          1: G.playOrder[2],
          2: G.playOrder[1],
          3: G.playOrder[0],
        }, initialPlacementsCount: G.initialPlacementsCount + 1
      }
    } else if (G.initialPlacementsCount === G.players.length * 2 - 1) {
      ctx.events.endTurn()
      return {
        ...G, playOrder: {
          0: G.playOrder[3],
          1: G.playOrder[2],
          2: G.playOrder[1],
          3: G.playOrder[0],
        }, initialPlacementsCount: G.initialPlacementsCount + 1
      }
    }

    ctx.events.endTurn()
    ctx.events.setActivePlayers({ currentPlayer: "initialSettlement" })
    return { ...G, initialPlacementsCount: G.initialPlacementsCount + 1 }
  },
  roll: (G, ctx, num) => {
    console.log(G.players)
    if (num === 7) {

    } else {
      const spoils = board.rolls[`${num}`]
      spoils.forEach(tile => {
        if (!tile.blocked) {
          Object.keys(tile.edges).forEach(edge => {
            if (tile.edges[edge].placement) {
              let player = G.colorPlayerHash[tile.edges[edge].placement.color]
              player.cards[board.terrainYields[tile.terrainType]] += tile.edges[edge].placement.itemType === "settlement" ? 1 : 2
            }
          })
        }
      })
    }
  }
}

export const Catan = {
  name: "settlers",
  setup: (ctx, setupData) => {
    const tiles = board.tiles
    const scoreboard = {};
    const players = [new Player("bill", "white"), new Player("Alex", "red"), new Player("Fern", "blue"), new Player("Daren", "orange")]
    const nodes = [...board.graph.adjList.keys()]
    // const nodes = board.graph.adjList
    const initialState = {
      players: players,
      playOrder: {
        0: players[0],
        1: players[1],
        2: players[2],
        3: players[3],
      },
      settlements: {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
      },
      colorPlayerHash: {
        "white": players[0],
        "red": players[1],
        "blue": players[2],
        "orange": players[3]
      },
      establishingOrder: {
        reRolls: [],
        iterations: 0,
        highestRoll: 0,
        playerIndex: 0
      },
      initialPlacementsCount: 0,
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
      if (node.canBuild) {
        node.placement = ctx.currentPlayer
        node.canBuild = false
        let adjacentNodes = board.graph.adjList.get(node)
        adjacentNodes.forEach(adjacentNode => adjacentNode.canBuild = false)
      } else {
        return INVALID_MOVE
      }

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
  turn: {
    stages: {
      initialSettlement: {
        moves: {
          placeSettlement: moves.initialPlacements,
        },
        next: "initialRoad"
      },
      initialRoad: {
        moves: {
          placeRoad: moves.placeRoad
        }
      }

    }
  },
  phases: {
    establishOrder: {
      start: true,
      moves: {
        roll: moves.initialRoll
      },
      endIf: (G, ctx) => {
        let complete = G.establishingOrder.iterations === 1 && G.establishingOrder.reRolls.length === 0
        // ctx.events.setStage("initialSettlement")
        return complete
      },
      onEnd: (G, ctx) => {
        ctx.events.setActivePlayers({ currentPlayer: "initialSettlement" })
      },
      turn: {
        moveLimit: 1
      },
      next: "initialPlacings",
    },
    initialPlacings: {
      // in this phase, every user will be allowed to place two settlements and two roads
      // the order will go as it is written and then reversed
      // moves: {
      //   placeSettlement: moves.initialPlacements,
      //   placeRoad: (G, ctx, node) => {
      //   },
      // },
      endIf: (G) => {
        return G.initialPlacementsCount === G.players.length * 2
      },
      next: "mainGame"
    },
    mainGame: {
      moves: {
        mainRoll: moves.roll
      },
      endIf: (G) => { }
    }

  }
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
