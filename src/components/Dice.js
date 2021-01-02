import React, { useState } from 'react';

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
                <div className="die">
                    <p>{diceRoll.first}</p>
                </div>
                <div className="die">
                    <p>{diceRoll.second}</p>
                </div>
            </div>
            <button className="rollButton" onClick={rollDice}>Roll</button>
        </div>
    );
};

export default Dice;