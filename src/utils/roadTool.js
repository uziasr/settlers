export const roadTool = (validNodes, tile) => {
    let roadCache = {}
    let classNames = []
    validNodes.forEach(node => {
        // iterating through every fresh node
        // if an adjacent node is in get, a road exists
        let roadsToNode = tile.edges[node].roadsTo // the Map
        
        let prevNode = node !== "1" ? `${parseInt(node) - 1}` : `${6}`;
        let nextNode = node !== "6" ? `${parseInt(node) + 1}` : `${1}`;
        let prev = `${prevNode}${parseInt(node)}`
        let next = `${parseInt(node)}${nextNode}`
        if (!roadCache[prev]) {
            if (roadsToNode.get(tile.edges[prevNode])) classNames.push({loc:prev, road: roadsToNode.get(tile.edges[prevNode])})
            roadCache[prev] = true
        }
        if (!roadCache[next]) {
            if (roadsToNode.get(tile.edges[nextNode])) classNames.push({loc:next, road: roadsToNode.get(tile.edges[nextNode])})
            roadCache[next] = true
        }
    })
    return classNames
}