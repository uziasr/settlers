import { INVALID_MOVE } from 'boardgame.io/core';
import { board, Player, developmentCards } from "./components/gameLogic"
// import { current } from 'immer';

const moves = {
  initialRoll: (G, ctx, roll) => {
    let establishingOrder = { ...G.establishingOrder }
    if (roll > establishingOrder.highestRoll) {
      establishingOrder.highestRoll = roll
      establishingOrder.playerIndex = ctx.currentPlayer
    }
    if (ctx.currentPlayer === "3") {
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
      currentPlayer.placements.push(node)
      if (G.initialPlacementsCount >= G.players.length) {
        node.yields.forEach(resource => currentPlayer.cards[resource] !== undefined ? currentPlayer.cards[resource]++ : null)
      }
    } else {
      return INVALID_MOVE
    }
    let adjacentNodes = board.graph.adjList.get(node)
    adjacentNodes.forEach(adjacentNode => adjacentNode.canBuild = false)
    ctx.events.setActivePlayers({ currentPlayer: "initialRoad" })
    return { ...G, settlements: { ...G.settlements, [ctx.currentPlayer]: [...G.settlements[ctx.currentPlayer], node] } }
  },
  placeRoad: (G, ctx, node) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    let currentSettlements = [...G.settlements[ctx.currentPlayer]]
    if (!board.graph.adjList.get(currentSettlements[currentSettlements.length - 1]).includes(node)) {
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
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    if (num === 7) {
      // "0":"player"
      let playerDiscardHash = {}
      let willDiscard = false
      for (let playerKey in G.playOrder) {
        if (Object.keys(G.playOrder[playerKey].cards).reduce((acc, curr) => acc + G.playOrder[playerKey].cards[curr], 0) > 7) {
          playerDiscardHash[playerKey] = 'discardFromSeven'
          willDiscard = true
        } else {
          playerDiscardHash[playerKey] = null
        }
      }
      if (willDiscard) {
        ctx.events.setActivePlayers({ value: playerDiscardHash })
      } else {
        ctx.events.setActivePlayers({ currentPlayer: "strategize" })
      }
    } else {
      const spoils = board.rolls[`${num}`]
      spoils.forEach(tile => {
        if (!tile.blocked) {
          Object.keys(tile.edges).forEach(edge => {
            if (tile.edges[edge].placement) {
              let player = G.colorPlayerHash[tile.edges[edge].placement.color]
              player.cards[board.terrainYields[tile.terrainType]] += tile.edges[edge].placement.item === "settlement" ? 1 : 2
            }
          })
        }
      })
      currentPlayer.developmentCards.forEach(card => card.useable = card.type === "Victory Point" ? false : true)
      ctx.events.setActivePlayers({ currentPlayer: "strategize" })

    }
  },
  buildSettlement: (G, ctx, node) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    if (["wood", "brick", "hay", "sheep"].every(resource => currentPlayer.cards[resource] >= 1) && currentPlayer.settlements.length) {
      currentPlayer.cards["wood"]--
      currentPlayer.cards["brick"]--
      currentPlayer.cards["hay"]--
      currentPlayer.cards["sheep"]--
      node.placement = currentPlayer.settlements.pop()
      currentPlayer.points++
    } else {
      return INVALID_MOVE
    }
  },
  buildCity: (G, ctx, node) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    const adequateCards = currentPlayer.cards["hay"] >= 3 && currentPlayer.cards["mineral"] >= 2
    const adequateCities = currentPlayer.cities.length
    const settlementOwnership = node.placement && node.placement.color === currentPlayer.color
    if (adequateCards && adequateCities & settlementOwnership) {
      currentPlayer["hay"] -= 3
      currentPlayer["mineral"] -= 2
      currentPlayer.settlements.push(node.placement)
      node.placement = currentPlayer.cities.pop()
      currentPlayer.points++
    } else {
      return INVALID_MOVE
    }
  },
  getDevelopmentCard: (G, ctx) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    if (currentPlayer.cards["mineral"] >= 1 && currentPlayer.cards["sheep"] >= 1 && currentPlayer.cards["hay"] >= 1) {
      currentPlayer.cards["mineral"]--
      currentPlayer.cards["sheep"]--
      currentPlayer.cards["hay"]--
      currentPlayer.developmentCards.push(G.developmentDeck.shift())
    } else {
      return INVALID_MOVE
    }

  },
  developmentCardAction: (G, ctx, dc, yearOfPlenty = {}, monopoly = null) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    switch (dc.type) {
      case "Road Builder": {
        break
      }
      case "Year of Plenty": {
        currentPlayer.cards["wood"] += yearOfPlenty["wood"]
        currentPlayer.cards["brick"] += yearOfPlenty["brick"]
        currentPlayer.cards["hay"] += yearOfPlenty["hay"]
        currentPlayer.cards["sheep"] += yearOfPlenty["sheep"]
        currentPlayer.cards["mineral"] += yearOfPlenty["mineral"]
        currentPlayer.developmentCards = currentPlayer.developmentCards.filter(card => card !== dc)
        G.developmentDeck.push(dc)
        break
      }
      case "Monopoly": {
        G.players.forEach(player => {
          // console.log(mono)
          let playerCards = 0;
          if (player !== currentPlayer) {
            playerCards = player.cards[monopoly]
            player.cards[monopoly] = 0
          }
          currentPlayer.cards[monopoly] += playerCards
        })
        currentPlayer.developmentCards = currentPlayer.developmentCards.filter(card => card !== dc)
        G.developmentDeck.push(dc)
        G.developmentCardUsed = true
        break
      }
      case "Knight": {
        break
      }
      default: {
        break
      }
    }
    // currentPlayer.developmentCards.forEach(card => card.useable = card.type === "Victory Point" ? false : true)

  },
  buildRoad: (G, ctx, node, legalRoad) => {
    const currentPlayer = G.playOrder[ctx.currentPlayer]
    if (currentPlayer.cards["wood"] >= 1 && currentPlayer.cards["brick"] >= 1 && legalRoad) {
      currentPlayer.cards["wood"]--
      currentPlayer.cards["brick"]--
      board.connectRoad(node, legalRoad, currentPlayer.roads.pop())
    } else {
      return INVALID_MOVE
    }
  },
  completeTurn: (G, ctx, node) => {
    ctx.events.endTurn()
    ctx.events.setActivePlayers({ currentPlayer: "startTurn" })
  },
  discarding: (G, ctx, discards) => {
    // discards = {"wood": 3, "brick": 1}
    console.log("you may now discard")

  },
  setRobber: (G, ctx, tile) => {

  },
  rob: (G, ctx, player) => {

  }
}

export const Catan = {
  name: "settlers",
  setup: (ctx, setupData) => {
    const tiles = board.tiles
    // const scoreboard = {};
    const players = [new Player("Bill", "white"), new Player("Alex", "red"), new Player("Fern", "blue"), new Player("Daren", "orange")]
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
      developmentDeck: developmentCards.deck,
      establishingOrder: {
        reRolls: [],
        iterations: 0,
        highestRoll: 0,
        playerIndex: 0
      },
      initialPlacementsCount: 0,
      tiles: tiles,
      nodes: nodes,
      developmentCardUsed: false,
    };
    return initialState;
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
      },
      startTurn: {
        moves: {
          roll: moves.roll,
          swiftKnight: moves.knight,
        },
        next: "strategize"
      },
      strategize: {
        moves: {
          placeSettlement: moves.buildSettlement,
          buildCity: moves.buildCity,
          getDevelopmentCard: moves.getDevelopmentCard,
          completeTurn: moves.completeTurn,
          developmentCardAction: moves.developmentCardAction,
          buildRoad: moves.buildRoad
        }
      },
      discardFromSeven: {
        moves: {
          discarding: moves.discarding
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
      endIf: (G) => {
        return G.initialPlacementsCount === G.players.length * 2
      },
      onEnd: (G, ctx) => {
        ctx.events.setActivePlayers({ currentPlayer: "startTurn" })
      },
      next: "mainGame"
    },
    mainGame: {
      endIf: (G, ctx) => {
        return G.playOrder[0].score > 10 && G.playOrder[1] && G.playOrder[2].score > 10 && G.playOrder[3]
      }
    }

  }
}
