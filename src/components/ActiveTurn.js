import React, { useState } from 'react';
import CardView from "./DevelopmentCardDialog"
import Tooltip from '@material-ui/core/Tooltip';
import Dice from "./Dice"

let developmentCards = [
    { type: "Knight", useable: true, img: "image/knight.jpg" },
    { type: "Victory Point", useable: true, img: "image/victoryPoint.jpg" },
    { type: "Road Builder", useable: true, img: "image/roadBuilder.jpg" },
    { type: "Year of Plenty", useable: true, img: "image/yearOfPlenty.jpg" },
    { type: "Monopoly", useable: true, img: "image/monopoly.jpg" }
]

const ActiveTurn = ({ setBuildType, endTurn, roll, player, buildType, developmentCardAction, getDevelopmentCard }) => {

    let placeHolderCard = { type: "Knight", useable: false, img: "image/knight.jpg" }
    const [open, setOpen] = useState(false);
    const [focusedDC, setFocusedDC] = useState(placeHolderCard)

    const handleClickOpen = (dc) => {
        setFocusedDC(() => dc)
        setOpen(true);
    };

    const developmentImgHash = {
        "Knight": "image/knight.jpg",
        "Monopoly": "image/monopoly.jpg",
        "Road Builder": "image/roadBuilder.jpg",
        "Victory Point": "image/victoryPoint.jpg",
        "Year of Plenty": "image/yearOfPlenty.jpg"
    }

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
                        {player.developmentCards.length ?
                            player.developmentCards.map((dc, index) => {
                                console.log(dc)
                                return (<div key={index} onClick={() => handleClickOpen(dc)} className="developmentCard">
                                    <img className="developmentCardImg" src={developmentImgHash[dc.type]}></img>
                                </div>)
                            })
                            :
                            <div style={{ visibility: "hidden" }} className="developmentCard">
                                <img className="developmentCardImg" alt="sneaky but you can't use :)" src={placeHolderCard.img}></img>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="actionButtonsDiceWrap">
                <div className="actionButtons">
                    <h3 style={{ marginBottom: "10px" }}>Moves</h3>
                    <div className="topBuilds">
                        <Tooltip title={buildType === "road" ? "Select a node" : "1 wood, 1 brick"}>
                            <div className="build" onClick={() => {
                                setBuildType("road")
                            }}>
                                <p style={{ color: buildType === "road" ? "white" : "black" }}>Road</p>
                            </div>
                        </Tooltip>
                        <Tooltip title={buildType === "settlement" ? "Select a node" : "1 wood, 1 brick, 1 sheep, 1 hay"}>
                            <div className="build" onClick={() => setBuildType("settlement")}>
                                <p style={{ color: buildType === "settlement" ? "white" : "black" }}>Settlement</p>
                            </div>
                        </Tooltip>
                        <div className="build" style={{ background: "mediumseagreen" }}>
                            <p>Trade</p>
                        </div>
                    </div>
                    <div className="bottomBuilds">
                        <Tooltip title={buildType === "city" ? "Select a node" : "3 hay, 2 mineral"}>
                            <div className="build" onClick={() => setBuildType("city")}>
                                <p style={{ color: buildType === "city" ? "white" : "black" }}>City</p>
                            </div>
                        </Tooltip>
                        <Tooltip title="1 sheep, 1 hay, 1 mineral">
                            <div className="build" onClick={() => {
                                console.log("this is logging", getDevelopmentCard)
                                getDevelopmentCard()
                            }}>
                                <p>Development Card</p>
                            </div>
                        </Tooltip>
                        <div className="build endTurnButton" style={{ background: "rgb(223, 91, 91)" }} onClick={() => endTurn()}>
                            <p>End Turn </p>
                        </div>
                    </div>
                </div>
                <Dice roll={roll} />
            </div>
            <CardView
                open={open}
                setOpen={setOpen}
                dc={focusedDC}
                dcImg={developmentImgHash[focusedDC.type]}
                player={player}
                developmentCardAction={developmentCardAction}
            />
        </div>
    );
};

export default ActiveTurn;