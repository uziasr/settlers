import React from 'react';
import './index.css';
// import _ from 'lodash';
import { board } from "./gameLogic"
import ActiveTurn from "./ActiveTurn"
import Nodes from "./Nodes"
import ScoreBoard from "./ScoreBoard"

// board.createBoard()

let usedNodes = new Map()

class Board extends React.Component {
    constructor(props) {
        super(props);
        // this.usedNodes = new Map()
        this.state = {
            board_pieces: [
                board.tiles[9], board.tiles[10], board.tiles[11],
                board.tiles[8], board.tiles[2], board.tiles[3], board.tiles[12],
                board.tiles[7], board.tiles[1], board.tiles[0], board.tiles[4], board.tiles[13],
                board.tiles[18], board.tiles[6], board.tiles[5], board.tiles[14],
                board.tiles[17], board.tiles[16], board.tiles[15]
            ],

            renderAgain: false,
            buildType: null,
            currentPlayer: this.props.G.playOrder[this.props.ctx.currentPlayer]
        }
        this.setBuildType = this.setBuildType.bind(this)
    }

    renderTerritory(i) {
        let tile = this.state.board_pieces[i]
        let returnNodes = {}
        for (let nodeIndex in tile.edges) {
            if (usedNodes.get(tile.edges[nodeIndex]) === undefined) {
                returnNodes[nodeIndex] = tile.edges[nodeIndex]
                usedNodes.set(tile.edges[nodeIndex], true)
            }
        }
        return (
            <Territory
                buildType={this.state.buildType}
                territory_props={tile}
                nodes={returnNodes}
                nodeHash={this.state.nodeHash}
                moves={this.props.moves}
                nodeAction={this.nodeAction}
            />
        )
    }

    nodeAction = (node) => {
        switch (this.state.buildType) {
            case "road": {
                this.props.moves.placeRoad(node)
                this.setState({ ...this.state, buildType: null })
                break
            }
            case "settlement": {
                this.props.moves.placeSettlement(node)
                this.setState({ ...this.state, buildType: null })
                break
            }
            case "city": {
                this.props.moves.buildCity(node)
                this.setState({ ...this.state, buildType: null })
                break
            }
            default: {
                console.log("hi", node)
            }
        }
    }

    nextTurn = () => {
        this.props.events.endTurn()
    }

    setBuildType(value) {
        this.setState({ ...this.state, buildType: this.state.buildType === value ? null : value })
    }

    resetMap() {
        usedNodes = new Map()
    }

    render() {
        return (
            <div className="table">
                <div className="boardAndPlayers">
                    <div className="board">
                        <div className="board-row">
                            <div className="spacer"></div>
                            <div className="port port-left" style={{ top: "25px" }}>?</div>
                            <div className="spacer"></div>
                            <div className="port port-left">🐑</div>
                            <div className="spacer"></div>
                            <div className="spacer"></div>
                        </div>
                        <div className="board-row">
                            <div className="spacer"></div>
                            <div className="spacer"></div>
                            {this.renderTerritory(0)}
                            {this.renderTerritory(1)}
                            {this.renderTerritory(2)}
                            <div className="port port-right">⛏</div>
                            <div className="spacer"></div>
                        </div>
                        <div className="board-row">
                            <div className="port port-left">🌲</div>
                            {this.renderTerritory(3)}
                            {this.renderTerritory(4)}
                            {this.renderTerritory(5)}
                            {this.renderTerritory(6)}
                            <div className="spacer"></div>
                        </div>
                        <div className="board-row">
                            <div className="spacer"></div>
                            {this.renderTerritory(7)}
                            {this.renderTerritory(8)}
                            {this.renderTerritory(9)}
                            {this.renderTerritory(10)}
                            {this.renderTerritory(11)}
                            <div className="port port-right">🐑</div>
                        </div>
                        <div className="board-row">
                            <div className="port port-left">🌾</div>
                            {this.renderTerritory(12)}
                            {this.renderTerritory(13)}
                            {this.renderTerritory(14)}
                            {this.renderTerritory(15)}
                            <div className="spacer"></div>
                        </div>
                        <div className="board-row">
                            <div className="spacer"></div>
                            <div className="spacer"></div>
                            {this.renderTerritory(16)}
                            {this.renderTerritory(17)}
                            {this.renderTerritory(18)}
                            <div className="port port-right">🧱</div>
                            <div className="spacer"></div>
                        </div>
                        <div className="board-row">
                            <div className="spacer"></div>
                            <div className="port port-left">?</div>
                            <div className="spacer"></div>
                            <div className="port port-left">🐑</div>
                            <div className="spacer"></div>
                            <div className="spacer"></div>
                        </div>
                    </div>
                    <ScoreBoard 
                    players={this.props.G.playOrder}
                    currentPlayer={this.props.G.playOrder[this.props.ctx.currentPlayer]}
                    />
                </div>
                <ActiveTurn
                    setBuildType={this.setBuildType}
                    endTurn={this.props.moves.completeTurn}
                    roll={this.props.moves.roll}
                    player={this.props.G.playOrder[this.props.ctx.currentPlayer]}
                    buildType={this.state.buildType}
                    developmentCardAction={this.props.moves.developmentCardAction}
                />
                {this.resetMap()}
            </div>
        )
    }
}

class Territory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeHash: {
                "1": {
                    position: "absolute", bottom: "49px", fontWeight: "bold", fontSize: "20px", color: "black", zIndex: 1,
                    left: "-5px"
                },
                "2": {
                    position: "absolute", bottom: "78px", fontWeight: "bold", fontSize: "20px", color: "black", zIndex: 1,
                    left: "45px"
                },
                "3": {
                    position: "absolute", bottom: "49px", fontWeight: "bold", fontSize: "20px", color: "black", zIndex: 1,
                    left: "96px"
                },
                "4": {
                    position: "absolute", bottom: "-10px", fontWeight: "bold", fontSize: "20px", color: "black", zIndex: 1,
                    left: "96px"
                },
                "5": {
                    position: "absolute", bottom: "-38px", fontWeight: "bold", fontSize: "20px", color: "black", zIndex: 1,
                    left: "45px"
                },
                "6": {
                    position: "absolute", bottom: "-11px", fontWeight: "bold", fontSize: "20px", color: "black", zIndex: 1,
                    left: "-5px"
                }
            },
        }
    }

    render() {
        if (!this.props.territory_props) {
            return <span>Loading...</span>;
        }
        let classname = "territory territory-type-"
            + this.props.territory_props.terrainType + " prob-"
            + this.props.territory_props.prob;

        return (
            <div className={classname} >
                <div className="number-token">

                    <Nodes
                        nodes={this.props.nodes}
                        nodeHash={this.state.nodeHash}
                        nodeAction={this.props.nodeAction}
                        tile={this.props.territory_props}
                    />
                    <p className="number">{this.props.territory_props.roll}</p>
                    <p className="probability-ticks">{".".repeat(this.props.territory_props.prob)}</p>

                </div>
            </div>
        )
    }
}


// to-do: consider replacing with Lodash shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function piece_generator() {
    const number_chits = [
        { id: "A", number: 5, prob: 4 },
        { id: "B", number: 2, prob: 1 },
        { id: "C", number: 6, prob: 5 },
        { id: "D", number: 3, prob: 2 },
        { id: "E", number: 8, prob: 5 },
        { id: "F", number: 10, prob: 3 },
        { id: "G", number: 9, prob: 4 },
        { id: "H", number: 12, prob: 1 },
        { id: "I", number: 11, prob: 2 },
        { id: "J", number: 4, prob: 3 },
        { id: "K", number: 8, prob: 5 },
        { id: "L", number: 10, prob: 3 },
        { id: "M", number: 9, prob: 4 },
        { id: "N", number: 4, prob: 3 },
        { id: "O", number: 5, prob: 4 },
        { id: "P", number: 6, prob: 5 },
        { id: "Q", number: 3, prob: 2 },
        { id: "R", number: 11, prob: 2 }
    ];

    const terrain_distribution = [
        ["wheat", 4],
        ["forest", 4],
        ["sheep", 4],
        ["ore", 3],
        ["brick", 3]
    ];

    // todo: simplify this
    let terrains = [];
    terrain_distribution.forEach((t) => {
        for (let i = 0; i < t[1]; i++) {
            terrains.push(t[0]);
        }
    });

    const numbers_shuffled = shuffle(number_chits)
    const terrains_shuffled = shuffle(terrains)

    const pieces = []
    for (let i = 0; i < numbers_shuffled.length; i++) {
        pieces[i] = numbers_shuffled[i];
        pieces[i].territory_type = terrains_shuffled[i];
        pieces[i].prob_display = "∙".repeat(numbers_shuffled[i].prob);
    }

    pieces.splice(Math.floor(Math.random() * (pieces.length + 1)), 0,
        { id: "X", number: 0, prob: 0, territory_type: "desert" });

    console.log(pieces)
    return pieces;
}

export default Board