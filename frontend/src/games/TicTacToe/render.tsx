import { useRef, useState } from "react";
import "./index.css";
import { Cell, Results, TicTacToe } from ".";
import { Button } from "../../components/button";
import { useTranslation } from "react-i18next";

import useSound from "use-sound";
import clickSound from "../../assets/sounds/click.mp3";
import { useAppConfig } from "../../context";
import { TicTacToeVersusAI } from "./TicTacToeAI";

type TicTacToeRenderProps = {
  board: Cell[];
  hasFinished: number[];
  winner: Results;
};

export const TicTacToeRender = () => {
  const { t } = useTranslation();
  const { sound: soundOn } = useAppConfig();
  const [playClick] = useSound(clickSound, {
    interrupt: true,
    playbackRate: 1.5,
    soundEnabled: soundOn,
  });

  const gameRef = useRef(new TicTacToeVersusAI({ initialValue: "" }));
  const [gameState, setGameState] = useState<TicTacToeRenderProps>({
    board: gameRef.current.getBoard(),
    hasFinished: new Array(3).fill(undefined),
    winner: null,
  });

  const updateGame = () => {
    const game = gameRef.current;
    setGameState(() => ({
      board: [...game.getBoard()],
      hasFinished: [...game.getWon()],
      winner: game.getWinner(),
    }));
  };

  const handleMove = (index: number) => {
    const game = gameRef.current;
    const madeMove = game.makeMove(index);
    if (madeMove) {
      playClick();
      updateGame();
    }
  };

  const restartGame = () => {
    const game = gameRef.current;
    game.reset();
    updateGame();
  };

  const checkFinished = () => {
    return (
      gameState.hasFinished.every((value) => value !== undefined) ||
      gameState.board.every((value) => value !== "")
    );
  };

  return (
    <div className="container">
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
              checkFinished() && gameState.hasFinished.includes(index)
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
        {gameState.winner && <p>Winner: {gameState.winner}</p>}
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
