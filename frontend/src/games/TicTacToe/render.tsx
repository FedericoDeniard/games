import { useRef, useState } from "react";
import "./index.css";
import { TicTacToe } from ".";

export const TicTacToeRender = () => {
  const gameRef = useRef(new TicTacToe({ initialValue: "" }));
  const [gameState, setGameState] = useState({
    board: gameRef.current.getBoard(),
    hasWon: new Array(3),
  });

  const updateGame = () => {
    const game = gameRef.current;
    setGameState(() => ({
      board: [...game.getBoard()],
      hasWon: [...game.getWon()],
    }));
  };

  const handleMove = (index: number) => {
    const game = gameRef.current;
    const madeMove = game.makeMove(index);
    if (madeMove) {
      updateGame();
    }
  };

  const restartGame = () => {
    const game = gameRef.current;
    game.reset();
    updateGame();
  };

  return (
    <div
      className="tic-tac-toe-board"
      style={{
          gridTemplateColumns: `repeat(${Math.sqrt(
            gameState.board.length
          )}, auto)`,
      }}
    >
        {gameState.board.map((cell, index) => (
        <div
          className={`tic-tac-toe-cell ${
              gameState.hasWon.every((value) => value !== null) &&
              gameState.hasWon.includes(index)
              ? "tic-tac-toe-won"
                : gameState.hasWon.some((value) => value !== null)
              ? "tic-tac-toe-lost"
              : ""
          } ${cell === "X" ? "tic-tac-toe-cross" : "tic-tac-toe-circle"}`}
          key={index}
          onClick={() => handleMove(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};
