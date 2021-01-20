import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faHome, faRuler } from '@fortawesome/free-solid-svg-icons'
import { roadTool } from "../utils/roadTool"

const Nodes = ({ nodes, nodeAction, tile, newRoadNode }) => {
    const validNodes = [...Object.keys(nodes)]
    const  roads = roadTool(validNodes, tile)
    // console.log("revisited", potentialRoads)
    console.log("this is newRoadNodes",newRoadNode)

    return (
        <>
            {validNodes.map((nodeIndex, index) => (
                <div className={`node-${nodeIndex}`} key={index} style={{
                    color: nodes[nodeIndex].node.placement ? nodes[nodeIndex].node.placement.color : nodes[nodeIndex].color,
                    cursor: "pointer",
                }}
                    onClick={() => nodeAction(nodes[nodeIndex].node, newRoadNode? newRoadNode.from : null )}
                >
                    {nodes[nodeIndex].node.placement === null ?
                        <p>o</p>
                        :
                        nodes[nodeIndex].node.placement.item === "settlement" ?
                            <FontAwesomeIcon icon={faHome} style={{ stroke: "black", strokeWidth: 40, fontSize: "24px", left: "30px" }} />
                            :
                            <FontAwesomeIcon icon={faBuilding} />}
                </div>
            ))
            }
            {roads.map(road => (
                <div className={`road road-${road.loc}`}>
                    <FontAwesomeIcon style={{ fontSize: "24px", color: road.road.color, stroke: "black", strokeWidth: 40 }} icon={faRuler} />
                </div>
            ))}
        </>
    );
};

export default Nodes;

//nodes[nodeIndex].node.placement == null ? "" : nodes[nodeIndex].node.placement.item === "settlement" ? "settlement" : "city"