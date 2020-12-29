import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBuilding, faHome } from '@fortawesome/free-solid-svg-icons'

const Nodes = ({ nodes, nodeHash, nodeAction }) => {
    let validNodes = [...Object.keys(nodes)]
    // const colorHash = {
    //     "0": "white",
    //     "1": "red",
    //     "2": "blue",
    //     "3": "orange"
    // }


    return (
        <>
            {validNodes.map((nodeIndex, index) => (
                <div key={index} style={{ ...nodeHash[nodeIndex], color: nodes[nodeIndex].placement ? nodes[nodeIndex].placement.color : "black", cursor: "pointer" }} onClick={() => nodeAction(nodes[nodeIndex])}>
                    {nodes[nodeIndex].placement ? <FontAwesomeIcon icon={faHome} /> : <p>o</p>}
                </div>
            ))}
        </>
    );
};

export default Nodes;