import React, { useState } from 'react';
import Dice from "./Dice"

const ActiveTurn = ({ setBuildType }) => {

    return (
        <div className="userControls">
            <Dice />
            <div className="actionButtons">
                <div className="build" onClick={() => setBuildType("road")}>
                    <p>Build Road</p>
                </div>
                <div className="build" onClick={() => setBuildType("settlement")}>
                    <p>Build Settlement</p>
                </div>
                <div className="build" onClick={() => setBuildType("city")}>
                    <p>Build City</p>
                </div>
                <div className="build">
                    <p>Buy Development Card</p>
                </div>
                <div className="build">
                    <p>Trade</p>
                </div>
                <div className="build endTurnButton">
                    <p>End Turn</p>
                </div>
            </div>
        </div>
    );
};

export default ActiveTurn;