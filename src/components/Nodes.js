import React from 'react';

const Nodes = ({ nodes, nodeHash, nodeAction }) => {
    return (
        <>
            {Object.keys(nodes).map((nodeIndex, index) => {
                // console.log(nodeIndex)
                return <div key={index} style={{ ...nodeHash[nodeIndex], cursor: "pointer" }} onClick={() => nodeAction(nodes[nodeIndex])}>
                    <p>o</p>
                </div>
            }
            )}
        </>
    );
};

export default Nodes;