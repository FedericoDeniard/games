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
          className="tic-tac-toe-cell"
          key={index}
          onClick={() => handleMove(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};
