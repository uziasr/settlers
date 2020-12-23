import React, { useState } from 'react';

const Dice = () => {
    const [diceRoll, setDiceRoll] = useState({
        first: 1,
        second: 1,
    })

    const rollDice = () => {
        setDiceRoll({
            first: (Math.floor(Math.random() * 6) + 1),
            second: (Math.floor(Math.random() * 6) + 1)
        })
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