import React, { useState, useEffect } from "react";
import "./Maze.css"; 

const rows = 8;
const cols = 8;


const generateMaze = () => {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() < 0.2 ? 1 : 0)) 
  );
  maze[0][0] = 0; 
  maze[rows-1][cols-1] = 0; 
  return maze;
};

const Maze = () => {
  const [maze, setMaze] = useState(generateMaze);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [gameWon, setGameWon] = useState(false); 

  
  const resetGame = () => {
    setMaze(generateMaze());
    setPlayerPos({ row: 0, col: 0 });
    setGameWon(false); 
  };

  
  useEffect(() => {
    const handleKeyPress = (event) => {
      setPlayerPos((prev) => {
        if (gameWon) return prev; 

        const newPos = { ...prev };
        if (event.key === "ArrowUp" && prev.row > 0 && maze[prev.row - 1][prev.col] === 0) {
          newPos.row -= 1;
        } else if (event.key === "ArrowDown" && prev.row < rows - 1 && maze[prev.row + 1][prev.col] === 0) {
          newPos.row += 1;
        } else if (event.key === "ArrowLeft" && prev.col > 0 && maze[prev.row][prev.col - 1] === 0) {
          newPos.col -= 1;
        } else if (event.key === "ArrowRight" && prev.col < cols - 1 && maze[prev.row][prev.col + 1] === 0) {
          newPos.col += 1;
        }

        
        if (newPos.row === rows - 1 && newPos.col === cols - 1) {
          setGameWon(true);
        }

        return newPos;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [maze, gameWon]);

  return (
    <div className="maze-container">
      <h1 className="game-title">✨ Pokémon Maze Escape ✨</h1>
      <button className="reset-button" onClick={resetGame}>
        🔄 New Maze
      </button>

      <div className="maze-grid">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`maze-cell 
                  ${cell === 1 ? "wall" : "path"} 
                  ${playerPos.row === rowIndex && playerPos.col === colIndex ? "player" : ""} 
                  ${rowIndex === rows - 1 && colIndex === cols - 1 ? "destination" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="win-message">
          🎉 You Win! The Pokémon escaped the maze! 🎉
        </div>
      )}
    </div>
  );
};

export default Maze;
