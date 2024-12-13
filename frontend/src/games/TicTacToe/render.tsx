import { useRef, useState } from "react";
import "./index.css";
import { TicTacToe } from ".";

export const TicTacToeRender = () => {
  const gameRef = useRef(new TicTacToe({ initialValue: "" }));
  const [board, setBoard] = useState(gameRef.current.getBoard());

  const handleMove = (index: number) => {
    const game = gameRef.current;
    game.makeMove(index);
    setBoard([...game.getBoard()]);
  };

  return (
    <div
      className="tic-tac-toe-board"
      style={{
        gridTemplateColumns: `repeat(${Math.sqrt(board.length)}, auto)`,
      }}
    >
      {board.map((cell, index) => (
        <div
          className={`tic-tac-toe-cell ${
            hasWon.every((value) => value !== null) && hasWon.includes(index)
              ? "tic-tac-toe-won"
              : hasWon.some((value) => value !== null)
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
