import { useRef, useState } from "react";
import "./index.css";
import { TicTacToe } from ".";
import { Button } from "../../components/button";
import { useTranslation } from "react-i18next";

export const TicTacToeRender = () => {
  const { t } = useTranslation();

  const gameRef = useRef(new TicTacToe({ initialValue: "" }));
  const [gameState, setGameState] = useState({
    board: gameRef.current.getBoard(),
    hasWon: new Array(3).fill(undefined),
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

  const checkFinished = () => {
    console.log(gameState.hasWon);
    return (
      gameState.hasWon.every((value) => value !== undefined) ||
      gameState.board.every((value) => value !== "")
    );
  };

  return (
    <div>
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
              checkFinished() && gameState.hasWon.includes(index)
              ? "tic-tac-toe-won"
                : checkFinished()
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
      {
        <Button
          text={t("RESTART")}
          action={restartGame}
          show={checkFinished()}
        />
      }
    </div>
  );
};
