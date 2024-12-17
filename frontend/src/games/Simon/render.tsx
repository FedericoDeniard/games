import { useRef, useState } from "react";
import "./index.css";
import { Colour, Simon } from "./Simon";
import SimonSounds from "../../assets/sounds/simon/simon.wav";
import useSound from "use-sound";
import { Button } from "../../components/button";

type GameRenderProps = {
  currentColourShowed: undefined | Colour;
  playerTurn: boolean;
  sequence: Colour[];
  gameStarted: boolean;
};

export const SimonRender = () => {
  const [playSimonSound] = useSound(SimonSounds, {
    sprite: {
      1: [0, 100],
      2: [100, 100],
      3: [200, 100],
      4: [300, 100],
    },
  });

  const gameRef = useRef(new Simon());
  const [gameRenderProps, setGameRenderProps] = useState<GameRenderProps>({
    currentColourShowed: gameRef.current.getCurrentColorShowed(),
    playerTurn: true,
    sequence: gameRef.current.getSequence(),
    gameStarted: false,
  });

  const visualizeSequence = async () => {
    if (gameRenderProps.playerTurn) {
      const game = gameRef.current;
      game.extendSequence();

      await showColors();
    }
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

  return (
    <div className="container">
      <div className="simon-board">
        {[...Array(4)].map((_, i) => (
          <button
            disabled={!gameRenderProps.playerTurn}
            type="button"
            onClick={() => playSimonSound({ id: (i + 1).toString() })}
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
        action={visualizeSequence}
        text={"Start"}
        disabled={!gameRenderProps.playerTurn}
      />
    </div>
  );
};
