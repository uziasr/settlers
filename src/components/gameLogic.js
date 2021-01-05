class Node {
    constructor(tile) {
        this.placement = null;
        this.tiles = [tile]
        this.yields = []
        this.canBuild = true
        this.roadsTo = {}
    }
    // toString() {
    //     return `[${this.tiles}]`
    // }
}

class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.adjList = new Map() // adjacency list, keys = vertex, values hold an array of adjacent node
    }
    addVertex(v) {
        this.adjList.set(v, [])
    }
    addEdge(v, w) {
        // grabs the vertex and passes it to the array value
        // then vice versa
        if (this.adjList.get(v).includes(w) && this.adjList.get(w).includes(v)) {
            return
        } else {
            this.adjList.get(v).push(w)
            this.adjList.get(w).push(v)
        }
    }
    printGraph() {
        var getKeys = this.adjList.keys();

        for (var i of getKeys) {
            var getValues = this.adjList.get(i)
            var conc = ""

            for (var j of getValues) {
                conc += j + " "
            }
            console.log(i + " ->" + conc)
        }

    }
}

class Tile {
    constructor(terrainType, roll = null, prob = null) {
        this.edges = {
            1: null, // individual nodes
            2: null,
            3: null,
            4: null,
            5: null,
            6: null
        }
        this.prob = prob
        this.terrainType = terrainType
        this.roll = roll
        this.roads = {}
        this.blocked = false
    }
    toString() {
        return ` ${this.roll} of ${this.terrainType}`
    }
}



class Board {
    constructor() {
        this.tiles = []
        this.centerTile = null;
        this.graph = new Graph(57)
        this.terrains = [
            "Hills", "Mountain", "Hills",
            "Fields", "Forest", "Forest",
            "Fields", "Forest", "Pasture",
            "Hills", "Pasture", "Mountain",
            "Fields", "Fields", "Mountain",
            "Pasture", "Pasture", "Desert",
            "Forest"
        ]
        this.numberChits = [
            11, 3, 6,
            5, 4, 9, 10,
            8, 4, 11, 12,
            9, 10, 8, 3,
            6, 2, 5
        ]
        this.rolls = {
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "8": [],
            "9": [],
            "10": [],
            "11": [],
            "12": []
        }
        this.terrainYields = {
            "Hills": "brick",
            "Fields": "hay",
            "Pasture": "sheep",
            "Forest": "wood",
            "Mountain": "mineral",
            "Desert": null
        }
        this.probabilityHash = {
            5: 4,
            2: 1,
            6: 5,
            3: 2,
            8: 5,
            10: 3,
            9: 4,
            12: 1,
            11: 2,
            4: 3,
            8: 5,
            10: 3,
            9: 4,
            4: 3,
            5: 4,
            6: 5,
            3: 2,
            11: 2,
            [null]: null
        }
        this.placements = {}
    }

    numHashGet(num) {
        return this.circularArr(Number(num))
    }

    circularArr(n) {
        if (0 < n && n < 7) {
            return n
        } else if (n > 6) {
            return n - 6
        } else if (n < 0) {
            return n + 1 + 6
        }
    }

    createTile() {
        let terrain = this.terrains.shift()
        let roll = terrain === "Desert" ? null : this.numberChits.shift()
        let tile = new Tile(terrain, roll, this.probabilityHash[roll])
        if (tile.roll) {
            this.rolls[`${tile.roll}`].push(tile)
        }
        return tile
    }
    shuffleTilesAndNum() {

    }

    createCenterTile() {
        let center = this.createTile()
        this.connectTileNodes(center)
        this.tiles.push(center)
        this.centerTile = center
    }

    createInnerLayer() {
        let centerPointer = { first: 6, second: 1 }
        let currentTilePointer = { first: 4, second: 3 }
        for (let tileCount = 1; tileCount <= 6; tileCount++) {
            let currentTile = this.createTile()
            this.sharedNode(currentTile, currentTilePointer.first, centerPointer.first, this.centerTile, 1)
            this.sharedNode(currentTile, currentTilePointer.second, centerPointer.second, this.centerTile, -1)
            this.connectTileNodes(currentTile)

            centerPointer = { first: centerPointer.first + 1, second: centerPointer.second + 1 }
            currentTilePointer = { first: currentTilePointer.first + 1, second: currentTilePointer.second + 1 }
            this.tiles.push(currentTile)
        }
    }


    createOuterLayer() {
        let innerPointer = { first: 6, second: 1 }
        let currentTilePointer = { first: 4, second: 3 }
        let tilePointer = 1
        let innerTile = this.tiles[tilePointer]
        for (let tileCount = 0; tileCount < 11; tileCount++) {
            let currentTile = this.createTile()

            this.sharedNode(currentTile, currentTilePointer.first, innerPointer.first, innerTile, 1)
            this.sharedNode(currentTile, currentTilePointer.second, innerPointer.second, innerTile, -1)
            this.connectTileNodes(currentTile)

            if (tileCount % 2 === 1) { //switch tile after every other iteration
                tilePointer++
                innerTile = this.tiles[tilePointer]
            } else { // switch pointers in between
                innerPointer = { first: innerPointer.first + 1, second: innerPointer.second + 1 }
                currentTilePointer = { first: currentTilePointer.first + 1, second: currentTilePointer.second + 1 }
            }
            this.tiles.push(currentTile)
        }

    }
    createLastTile() {
        let lastTile = this.createTile()
        lastTile.edges[1] = this.tiles[7].edges[5]
        lastTile.edges[2] = this.tiles[7].edges[4]
        lastTile.edges[3] = this.tiles[6].edges[1]
        lastTile.edges[4] = this.tiles[17].edges[2]
        lastTile.edges[5] = this.tiles[17].edges[1]
        lastTile.edges[1].tiles.push(lastTile)
        lastTile.edges[2].tiles.push(lastTile)
        lastTile.edges[3].tiles.push(lastTile)
        lastTile.edges[4].tiles.push(lastTile)
        lastTile.edges[5].tiles.push(lastTile)

        lastTile.edges[1].yields.push(this.terrainYields[lastTile.terrainType])
        lastTile.edges[2].yields.push(this.terrainYields[lastTile.terrainType])
        lastTile.edges[3].yields.push(this.terrainYields[lastTile.terrainType])
        lastTile.edges[4].yields.push(this.terrainYields[lastTile.terrainType])
        lastTile.edges[5].yields.push(this.terrainYields[lastTile.terrainType])

        this.tiles.push(lastTile)
        this.connectTileNodes(lastTile)
    }

    connectTileNodes(currentTile) {
        let tileKeysArr = [...Object.keys(currentTile.edges), "1"]
        tileKeysArr.reduce((prev, curr) => {
            if (currentTile.edges[curr] === null) {
                currentTile.edges[curr] = new Node(currentTile)
                currentTile.edges[curr].yields.push(this.terrainYields[currentTile.terrainType])
                this.graph.addVertex(currentTile.edges[curr])
            }
            if (prev) {
                this.graph.addEdge(currentTile.edges[curr], currentTile.edges[prev])
            }
            return curr
        }, 0)
    }

    sharedNode(currentTile, currentTilePointer, referencePointer, referenceTile, increment) {

        let referenceFirstNode = referenceTile.edges[this.numHashGet(referencePointer)]
        let adjacentNodes = this.graph.adjList.get(referenceFirstNode)
        if (referenceFirstNode.tiles.length === 2) {
            currentTile.edges[this.numHashGet(currentTilePointer + increment)] = adjacentNodes[2]
            currentTile.edges[this.numHashGet(currentTilePointer + increment)].tiles.push(currentTile)
            currentTile.edges[this.numHashGet(currentTilePointer + increment)].yields.push(this.terrainYields[currentTile.terrainType])
        }
        currentTile.edges[this.numHashGet(currentTilePointer)] = referenceTile.edges[this.numHashGet(referencePointer)]
        currentTile.edges[this.numHashGet(currentTilePointer)].tiles.push(currentTile)
        currentTile.edges[this.numHashGet(currentTilePointer)].yields.push(this.terrainYields[currentTile.terrainType])

    }

    shuffle(a = this.terrains) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        this.terrains = a
        // let innerLayer = this.numberChits.slice(1, 7)
        // let outerLayer = this.numberChits.slice(7, this.terrains.length)
        let shift = (Math.floor(Math.random() * 6) + 1)
        // console.log(this.numberChits.slice(0, 7), this.numberChits.slice(7), shift)
        let newInner = [...this.numberChits.slice(shift, 7), ...this.numberChits.slice(1, shift)]
        let newOuter = [...this.numberChits.slice(shift + 7, this.numberChits.length), ...this.numberChits.slice(7, shift + 7)]
        // this.numberChits = [this.numberChits[0], ...newInner, ...newOuter]
        // console.log(newInner, newOuter)

    }

    connectRoad(targetNode, fromNode, road) {
        console.log(road)
        targetNode.roadsTo[road] = fromNode
        fromNode.roadsTo[road] = targetNode
    }

    createBoard() {
        this.shuffle()
        this.createCenterTile()
        this.createInnerLayer()
        this.createOuterLayer()
        this.createLastTile()
        for (let node of this.graph.adjList) {
            node[0].tiles = []
        }
    }
}

class BuildItem {
    constructor(itemType, color) { // can be roads, settlements, or cities
        this.item = itemType
        this.color = color
    }
    decrement() {
        this.quantity--
    }
    increment() {
        this.quantity++
    }
}

class Player {
    constructor(name, color) {
        this.name = name
        this.color = color
        this.roads = Array.from({ length: 15 }, (_) => new BuildItem("road", color))
        this.settlements = Array.from({ length: 5 }, (_) => new BuildItem("settlement", color))
        this.cities = Array.from({ length: 4 }, (_) => new BuildItem("city", color))
        this.cards = {
            "wood": 0,
            "brick": 0,
            "hay": 0,
            "sheep": 0,
            "mineral": 0
        }
        this.handQuantity = Object.keys(this.cards).reduce((acc, curr) => acc + this.cards[curr], 0)
        this.points = 0
        this.developmentCards = []
    }
    toString() {
        return `Player(name=${this.name}, color=${this.color})`
    }
}

class DevelopmentCard {
    constructor(type, useable = true) {
        this.type = type
        this.useable = useable
    }
}

class DevelopmentDeck {
    constructor() {
        this.deck = this.createDeck()
    }
    createDeck() {
        const knights = "Knight,".repeat(14).trim().split(",").slice(0, 14).map(card => new DevelopmentCard(card, false))
        const victory = "Victory Point,".repeat(5).trim().split(",").slice(0, 5).map(card => new DevelopmentCard(card, false))
        const roadBuilder = "Road Builder,".repeat(2).trim().split(",").slice(0, 2).map(card => new DevelopmentCard(card, false))
        const yearOfPlenty = "Year of Plenty,".repeat(2).trim().split(",").slice(0, 2).map(card => new DevelopmentCard(card, false))
        const monopoly = "Monopoly,".repeat(2).trim().split(",").slice(0, 2).map(card => new DevelopmentCard(card, false))
        let deck = [...knights, ...victory, ...roadBuilder, ...yearOfPlenty, ...monopoly]
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck
    }
}

let board = new Board()
board.createBoard()
let developmentCards = new DevelopmentDeck()
developmentCards.createDeck()
console.log(board.graph.adjList)
export { board, Player, developmentCards }



