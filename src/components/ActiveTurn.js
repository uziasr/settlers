import React, { useState } from 'react';
import Dice from "./Dice"

let developmentCards = [
    { type: "Knight", useable: true, img: "image/knight.jpg" },
    { type: "Victory Point", useable: true, img: "image/victoryPoint.jpg" },
    { type: "Road Builder", useable: true, img: "image/roadBuilder.jpg" },
    { type: "Year of Plenty", useable: true, img: "image/yearOfPlenty.jpg" },
    { type: "Monopoly", useable: true, img: "image/monopoly.jpg" }
]

let placeHolderCard = { type: "Knight", useable: false, img: "image/knight.jpg" }


const ActiveTurn = ({ setBuildType, endTurn, roll, player }) => {
    console.log(player)
    return (
        <div className="userControls">
            <div className="cards">
                <div className="resourceRoot">
                    <h3>Hand</h3>
                    <div className="resources">
                        <div className="resourceCard">🌲 x {player.cards["wood"]}</div>
                        <div className="resourceCard">🧱 x {player.cards["brick"]}</div>
                        <div className="resourceCard">🌾 x {player.cards["hay"]}</div>
                        <div className="resourceCard">🐑 x {player.cards["sheep"]}</div>
                        <div className="resourceCard"><span style={{ color: "black" }}>⛏</span> x {player.cards["mineral"]}</div>
                    </div>
                </div>
                <div className="developmentCardsRoot">
                    <h3>Development Cards</h3>
                    <div className="developmentCards">
                        {developmentCards.length ?
                            developmentCards.map(dc => (
                                <div className="developmentCard">
                                    <img className="developmentCardImg" src={dc.img}></img>
                                </div>
                            ))
                            :
                            <div style={{ visibility: "hidden" }} className="developmentCard">
                                <img className="developmentCardImg" alt="placeholder" src={placeHolderCard.img}></img>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="actionButtons">
                <h3>Moves</h3>
                <div className="topBuilds">
                    <div className="build" onClick={() => setBuildType("road")}>
                        <p>Road</p>
                    </div>
                    <div className="build" onClick={() => setBuildType("settlement")}>
                        <p>Settlement</p>
                    </div>
                    <div className="build" style={{ background: "mediumseagreen" }}>
                        <p>Trade</p>
                    </div>
                </div>
                <div className="bottomBuilds">
                    <div className="build" onClick={() => setBuildType("city")}>
                        <p>City</p>
                    </div>
                    <div className="build">
                        <p>Development Card</p>
                    </div>
                    <div className="build endTurnButton" style={{ background: "rgb(223, 91, 91)" }} onClick={() => endTurn()}>
                        <p>End Turn </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveTurn;