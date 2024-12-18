import Board from "./Board";
import React, { useState, useEffect } from "react";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundAsset from "../../sounds/game_over.wav";
import clickSoundAsset from "../../sounds/click.wav";


const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset)
clickSound.volume = 0.5;


const PLAYER_X = "X";
const PLAYER_O = "O";

const WINNING_COMBINATIONS = [
  // our rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  //colums
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [0, 3, 6], strikeClass: "strike-column-2" },
  { combo: [0, 3, 6], strikeClass: "strike-column-3" },
  //diagonas
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of WINNING_COMBINATIONS) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if(tileValue1 === PLAYER_X){
        setGameState(GameState.playerXwins);
      }
      else{
        setGameState(GameState.playerOwins);
      }
      return;
    }
  }
  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if(areAllTilesFilledIn && gameState === GameState.inProgress){
    setGameState(GameState.draw);
  }
}


  function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null)); // Initialize the tiles state
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X); // Initialize the playerTurn state
    const [strikeClass, setStrikeClass] = useState(); // Initialize the strikeClass state
    const [gameState, setGameState] = useState(GameState.inProgress); // Initialize the GameState state
    const handleClick = (index) => {
      if(gameState !== GameState.inProgress){
        return;
      }
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
    const handleReset = () => {
      setGameState(GameState.inProgress);
      setTiles(Array(9).fill(null));
      setPlayerTurn(PLAYER_X);
      setStrikeClass(null);
    };
    useEffect(() => {
      checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    useEffect(() => {
      if(tiles.some((tile) => tile !== null)){
        clickSound.play();
      }
    });

    useEffect(() => {
      if(gameState !== GameState.inProgress){
        gameOverSound.play();
      }
    });

    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <p>By Othmane benchekroun</p>
        <Board
          playerTurn={playerTurn}
          tiles={tiles}
          onTileClick={handleClick}
          strikeClass={strikeClass}
        />
        <GameOver gameState={gameState} />
        <Reset gameState={gameState} onReset={handleReset} />
      </div>
    );
  }

  export default TicTacToe;
