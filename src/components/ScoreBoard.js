import React, { useState } from "react"
import Typography from '@material-ui/core/Typography';

const ScoreBoard = ({ players, currentPlayer }) => {

    console.log(players)

    return (
        <table style={{ width: "80%" }}>
            <tr>
                <th><Typography variant="h5">Player</Typography></th>
                <th><Typography variant="h5">Resources</Typography></th>
                <th><Typography variant="h5">DC</Typography></th>
                <th><Typography variant="h5">Knights</Typography></th>
                <th><Typography variant="h5">VP</Typography></th>
            </tr>
            {Object.keys(players).map(player => (
                <tr>
                    <td><Typography style={{ background: players[player]  === currentPlayer ? "mediumseagreen": "#212529" }} variant="h6">{players[player].name}</Typography></td>
                    <td><Typography variant="body1">{players[player].handQuantity}</Typography></td>
                    <td><Typography variant="body1">{players[player].developmentCards.length}</Typography></td>
                    <td><Typography variant="body1">2</Typography></td>
                    <td><Typography variant="body1">{players[player].points}</Typography></td>
                </tr>
            ))}
        </table>
    )
}

export default ScoreBoard
