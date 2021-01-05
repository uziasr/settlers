import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faHome } from '@fortawesome/free-solid-svg-icons'

const Nodes = ({ nodes, nodeHash, nodeAction }) => {
    let validNodes = [...Object.keys(nodes)]

    return (
        <>
            {validNodes.map((nodeIndex, index) => (
                <div className={nodes[nodeIndex].placement == null ? "" : nodes[nodeIndex].placement.item === "settlement" ? "settlement" : "city"} key={index} style={{
                    ...nodeHash[nodeIndex],
                    color: nodes[nodeIndex].placement ? nodes[nodeIndex].placement.color : "black",
                    cursor: "pointer",
                }}
                    onClick={() => nodeAction(nodes[nodeIndex])}
                >
                    {nodes[nodeIndex].placement === null ?
                        <p>o</p>
                        :
                        nodes[nodeIndex].placement.item === "settlement" ?
                            <FontAwesomeIcon icon={faHome} style={{ stroke: "black", strokeWidth: 30, fontSize: "32px", left: "30px" }} />
                            :
                            <FontAwesomeIcon icon={faBuilding} />}
                </div>
            ))
            }
        </>
    );
};

export default Nodes;