import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faHome, faRuler, faRulerVertical } from '@fortawesome/free-solid-svg-icons'
import { roadTool } from "../utils/roadTool"

const Nodes = ({ nodes, nodeAction, tile }) => {
    let validNodes = [...Object.keys(nodes)]
    // console.log(tile)
    // console.log(validNodes)
    let roads = roadTool(validNodes, tile)
    // console.log(roads)

    return (
        <>
            {validNodes.map((nodeIndex, index) => (
                <div className={`node-${nodeIndex}`} key={index} style={{
                    color: nodes[nodeIndex].placement ? nodes[nodeIndex].placement.color : "black",
                    cursor: "pointer",
                }}
                    onClick={() => nodeAction(nodes[nodeIndex])}
                >
                    {nodes[nodeIndex].placement === null ?
                        <p>o</p>
                        :
                        nodes[nodeIndex].placement.item === "settlement" ?
                            <FontAwesomeIcon icon={faHome} style={{ stroke: "black", strokeWidth: 40, fontSize: "24px", left: "30px" }} />
                            :
                            <FontAwesomeIcon icon={faBuilding} />}
                </div>
            ))
            }
            {roads.map(road=>(
                <div className={`road road-${road.loc}`}>
                    <FontAwesomeIcon style={{fontSize:"24px", color: road.road.color, stroke: "black", strokeWidth: 40}}  icon={faRuler}/>
                </div>
            ))}
            {/* <div className="road" style={{  transform: "rotate(-62deg)"}}><FontAwesomeIcon style={{fontSize:"24px"}}  icon={faRuler}/></div> */}
        </>
    );
};

export default Nodes;

//nodes[nodeIndex].placement == null ? "" : nodes[nodeIndex].placement.item === "settlement" ? "settlement" : "city"