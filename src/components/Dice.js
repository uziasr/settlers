import React, { useState } from 'react';
import { Typography, Tooltip } from '@material-ui/core';

const Dice = ({ roll }) => {
    const [diceRoll, setDiceRoll] = useState({
        first: 1,
        second: 1,
    })

    const rollDice = () => {
        console.log(roll)
        let diceRoll = {
            first: (Math.floor(Math.random() * 6) + 1),
            second: (Math.floor(Math.random() * 6) + 1)
        }
        setDiceRoll(diceRoll)
        roll(diceRoll.first + diceRoll.second)
    }

    return (
        <div className="rollRoot">
            <div className="dice">
                <Tooltip title={`${diceRoll.first}, ${diceRoll.second}`}><div className="die"> <Typography>{diceRoll.first + diceRoll.second}</Typography></div></Tooltip>
            </div>
            <div className="rollButton" onClick={rollDice}>
                <Typography variant="button">Roll</Typography>
            </div>
        </div>
    );
};

export default Dice;
