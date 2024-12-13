import { useTranslation } from "react-i18next";
import { TicTacToeRender } from "../../games/TicTacToe/render";

export const TicTacToePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("TIC-TAC-TOE")}</h1>
      <TicTacToeRender />
    </div>
  );
};
