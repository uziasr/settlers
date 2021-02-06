import React, { useState, useEffect } from 'react';
import { board } from "../gameLogic"

import axios from "axios"

const CreateGame = () => {

    const createGame = () => {
        axios.post("http://localhost:8000/games/settlers/create", { numPlayers: 4, setupData: { board } })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <button onClick={createGame}>Create Game</button>
        </div>
    );
};

export default CreateGame;