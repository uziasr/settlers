import React, { useState, useEffect } from 'react';
import axios from "axios"


const LobbyView = () => {
    const [user, setUser] = useState({
        name: '',
        color: ''
    })
    const availableColors = ["red", "white", "blue", "orange"]

    return (
        <div>
            <input
                name="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
            </input>
            <input
                name="color"
                value={user.color}
                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
            </input>
            <button disabled={!user.name && !user.color && !availableColors.includes(user.color)}></button>
        </div>
    );
};

export default LobbyView;