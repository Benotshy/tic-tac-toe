import Board from "./Board";
import React, { useState } from "react";
const PLAYER_X = "X";
const PLAYER_O = "O";

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null)); // Initialize the tiles state
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X); // Initialize the playerTurn state
  const [strikeClass, setStrikeClass] = useState(""); // Initialize the strikeClass state
  const handleClick = (index) => {
    if (tiles[index] !== null) {
      return; // Do nothing if the tile is already filled
    }
    const newTiles = [...tiles]; // Copy the current tiles array
    newTiles[index] = playerTurn; // Set the new value
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleClick}
        strikeClass={strikeClass}
      />
    </div>
  );
}

export default TicTacToe;
