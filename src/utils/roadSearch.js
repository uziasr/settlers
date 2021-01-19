import { board } from "../components/gameLogic"


export const roadSearch = (player) => {
    const settlements = [...player.placements]
    const availableRoads = []
    const roadQueue = []
    const visited = []
    // console.log(playerSettlements)
    // iterate through settlements
    //     // for every settlement, iterate through adjacent nodes and push available roads
    // for(let settlement of settlements){
    //     let adjNodes = board.graph.adjList.get(settlement)

    // }
    let currentNode;
    while (settlements.length || roadQueue.length) {
        if (!roadQueue.length) {
            currentNode = settlements.shift()
            console.log("hi")
        } else {
            currentNode = roadQueue.shift()
            console.log("this isa from road>??????", currentNode)
        }
        let adjNodes = board.graph.adjList.get(currentNode)
        adjNodes.forEach(node => {
            if (visited.includes(node)) {
                // skip
            } else {
                let road = currentNode.roadsTo.get(node)
                // console.log("this is node", node, "this is player", player, "this is road", road)
                console.log("this is road", road)
                if (!node.placement && !road) {
                    // if there is no settlement and no road
                    availableRoads.push(node)
                } else if (road && road.color === player.color) {
                    console.log("these are the same color")
                    roadQueue.push(node)
                    // there is a road that belongs to the user, add the node to the roadQueue
                } else if (node.placement && node.placement.color === player.color) {
                    // the node in question has a settlement
                    console.log("my settlement")
                    settlements.unshift(node)
                    roadQueue.push(node)

                }
            }
        })
        visited.push(currentNode)
        console.log("this is road queue", roadQueue)
        console.log("will this repeat?", settlements.length, !roadQueue.length)
    }

    console.log("AVE ROADS", availableRoads)
    return [1, 23, 4]
}

// else {
    // at this point we can assume that if 
    // 1 the adjacent nodes don't have our settlements or roads
    // 2 and they are not empty
    // 3 they are occupied by the different players items
// }