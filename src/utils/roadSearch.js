import { board } from "../components/gameLogic"


export const roadSearch = (player) => {
    const settlements = [...player.placements]
    const availableRoads = []
    const roadQueue = []
    const visited = []
    let currentNode;
    while (settlements.length || roadQueue.length) {
        if (!roadQueue.length) {
            currentNode = settlements.shift()
        } else {
            currentNode = roadQueue.shift()
        }
        let adjNodes = board.graph.adjList.get(currentNode)
        adjNodes.forEach(node => {
            if (visited.includes(node)) {
                // skip
            } else {
                let road = currentNode.roadsTo.get(node)
                // console.log("this is node", node, "this is player", player, "this is road", road)
                // console.log("this is road", road)
                if (!node.placement && !road) {
                    // if there is no settlement and no road
                    availableRoads.push(node)
                } else if (road && road.color === player.color) {
                    // console.log("these are the same color")
                    roadQueue.push(node)
                    // there is a road that belongs to the user, add the node to the roadQueue
                } else if (node.placement && node.placement.color === player.color) {
                    // the node in question has a settlement
                    // console.log("my settlement")
                    settlements.unshift(node)
                    roadQueue.push(node)

                }
            }
        })
        visited.push(currentNode)
    }
    return availableRoads
}
