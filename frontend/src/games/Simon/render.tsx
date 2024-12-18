import { useRef, useState } from "react";
import "./index.css";
import { Colour, Simon } from "./Simon";
import SimonSounds from "../../assets/sounds/simon/simon.wav";
import LostSound from "../../assets/sounds/simon/lost.mp3";
import useSound from "use-sound";
import { Button } from "../../components/button";
import { useTranslation } from "react-i18next";

type GameRenderProps = {
  currentColourShowed: undefined | Colour;
  playerTurn: boolean;
  sequence: Colour[];
  gameStarted: boolean;
  lost: boolean;
};

export const SimonRender = () => {
  const { t } = useTranslation();
  const [playSimonSound] = useSound(SimonSounds, {
    sprite: {
      1: [0, 100],
      2: [100, 100],
      3: [200, 100],
      4: [300, 100],
    },
  });
  const [playLost] = useSound(LostSound);

  const gameRef = useRef(new Simon());
  const [gameRenderProps, setGameRenderProps] = useState<GameRenderProps>({
    currentColourShowed: undefined,
    playerTurn: true,
    sequence: gameRef.current.getSequence(),
    gameStarted: false,
    lost: true,
  });

  const startGame = async () => {
    gameRenderProps.currentColourShowed = undefined;
    gameRenderProps.playerTurn = false;
    gameRenderProps.gameStarted = true;
    gameRenderProps.lost = false;
      const game = gameRef.current;
    game.startGame();
    gameRenderProps.sequence = gameRef.current.getSequence();
    gameRenderProps.lost = gameRef.current.getLost();

      await showColors();
  };

  const showColors = () => {
    return new Promise<void>((resolve) => {
      setGameRenderProps((prevState) => ({ ...prevState, playerTurn: false }));
    gameRenderProps.sequence.forEach((value, index) => {
      setTimeout(() => {
        setGameRenderProps((prevState) => ({
          ...prevState,
          currentColourShowed: value,
        }));
          const soundToPlay = value.toString();
          playSimonSound({ id: soundToPlay });
      }, index * 1000);

        setTimeout(() => {
          setGameRenderProps((prevState) => ({
            ...prevState,
            currentColourShowed: undefined,
          }));
        }, index * 1000 + 500);
    });

    setTimeout(() => {
      setGameRenderProps((prevState) => ({
        ...prevState,
        playerTurn: true,
        currentColourShowed: undefined,
      }));
        resolve();
    }, (gameRenderProps.sequence.length + 1) * 1000);
    });
  };

  const makeMove = (buttonPressed: Colour) => {
    if (!gameRenderProps.lost) {
      playSimonSound({ id: buttonPressed.toString() });
      const game = gameRef.current;
      let completed = game.makePlayerMove(buttonPressed);
      const hasLost = game.getLost();
      setGameRenderProps((prevState) => ({
        ...prevState,
        lost: hasLost,
      }));
      if (hasLost) {
        playLost();
        setGameRenderProps((prevState) => ({
          ...prevState,
          gameStarted: false,
        }));
      }
      if (completed) {
        setGameRenderProps((prevState) => ({
          ...prevState,
          playerTurn: false,
        }));
        setTimeout(() => {
          showColors();
        }, 2000);
      }
    }
  };

  const handleClick = (button: Colour) => {
    makeMove(button);
  };

  return (
    <div className="container">
      <div className="simon-board">
        <div
          className={`simon-turn ${gameRenderProps.playerTurn ? "pulse" : ""}`}
          style={{
            backgroundColor: gameRenderProps.playerTurn ? "green" : "red",
            visibility: gameRenderProps.gameStarted ? "visible" : "hidden",
          }}
        >
          <p style={{ color: "white" }}>
            {gameRenderProps.playerTurn ? "▶" : "| |"}
          </p>
        </div>
        {[...Array(4)].map((_, i) => (
          <button
            disabled={
              !gameRenderProps.playerTurn || !gameRenderProps.gameStarted
            }
            type="button"
            onClick={() => handleClick((i + 1) as Colour)}
            key={i}
            className={`simon-cell simon-cell-${i + 1} ${
              gameRenderProps.currentColourShowed === i + 1
                ? `simon-cell-active-${i + 1}`
                : ""
            }`}
          ></button>
        ))}
      </div>
      <Button
        action={startGame}
        text={t("START-GAME")}
        disabled={gameRenderProps.gameStarted && !gameRenderProps.lost}
      />
    </div>
  );
};
