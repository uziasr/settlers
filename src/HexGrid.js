import React from 'react';
import "./grid.scss"
import board from "./CatanBoard"

board.createBoard()

const HexGrid = () => {
    const gridRows = {
        1: [board.tiles[9], board.tiles[10], board.tiles[11]],
        2: [board.tiles[8], board.tiles[2], board.tiles[3], board.tiles[12]],
        3: [board.tiles[7], board.tiles[1], board.tiles[0], board.tiles[4], board.tiles[13]],
        4: [board.tiles[18], board.tiles[6], board.tiles[5], board.tiles[14]],
        5: [board.tiles[17], board.tiles[16], board.tiles[15],]
    }
    const terrainColorHash = {
        "Hills": "peru",
        "Mountain": "skyblue",
        "Fields": "khaki",
        "Pasture": "mediumseagreen",
        "Forest": "seagreen",
        "Desert":"grey"
    }

    return (
        <div className="container">
            <ol className="odd">
                <li className='hex hidden'></li>
                {gridRows[1].map(tile => <li style={{background:terrainColorHash[tile.terrainType]}} className='hex' onClick={() => console.log(tile)}></li>)}
            </ol>
            <ol className="even">
                {gridRows[2].map(tile => <li style={{background:terrainColorHash[tile.terrainType]}} className='hex' onClick={() => console.log(tile)}></li>)}
            </ol>
            <ol className="odd">
                {gridRows[3].map(tile => <li style={{background:terrainColorHash[tile.terrainType]}} className='hex' onClick={() => console.log(tile)}></li>)}
            </ol>
            <ol className="even">
                {gridRows[4].map(tile => <li style={{background:terrainColorHash[tile.terrainType]}} className='hex' onClick={() => console.log(tile)}></li>)}
            </ol>
            <ol className="odd">
                <li className='hex hidden'></li>
                {gridRows[5].map(tile => <li style={{background:terrainColorHash[tile.terrainType]}} className='hex' onClick={() => console.log(tile)}></li>)}
            </ol>
        </div>
    );
};

export default HexGrid;