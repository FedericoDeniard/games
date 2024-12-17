import { useEffect, useRef, useState } from "react";
import "./index.css";
import { Colour, Simon } from "./Simon";
import SimonSounds from "../../assets/sounds/simon/simon.wav";
import useSound from "use-sound";
import { Button } from "../../components/button";

type GameRenderProps = {
  currentColourShowed: undefined | Colour;
  playerTurn: boolean;
  sequence: Colour[];
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
    playerTurn: false,
    sequence: gameRef.current.getSequence(),
  });

  useEffect(() => {
    if (gameRenderProps.currentColourShowed !== undefined) {
      const soundToPlay = gameRenderProps.currentColourShowed.toString();
      playSimonSound({ id: soundToPlay });
    }
  }, [gameRenderProps.currentColourShowed]);

  const visualizeSequence = () => {
    const game = gameRef.current;
    game.startSequence();

    gameRenderProps.sequence.forEach((value, index) => {
      setTimeout(() => {
        setGameRenderProps((prevState) => ({
          ...prevState,
          currentColourShowed: value,
        }));
      }, index * 1000);
    });

    setTimeout(() => {
      setGameRenderProps((prevState) => ({
        ...prevState,
        playerTurn: true,
        currentColourShowed: undefined,
      }));
    }, (gameRenderProps.sequence.length + 1) * 1000);
  };

  return (
    <div className="container">
      <div className="simon-board">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`simon-cell simon-cell-${i + 1} ${
              gameRenderProps.currentColourShowed === i + 1
                ? `simon-cell-active-${i + 1}`
                : ""
            }`}
          ></div>
        ))}
      </div>
      <Button action={visualizeSequence} text={"Start"} />
    </div>
  );
};
