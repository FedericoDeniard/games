import { useTranslation } from "react-i18next";
import { TicTacToeRender } from "../../games/TicTacToe/render";
import { Button } from "../../components/button";
import { useNavigate } from "react-router";
import "./index.css";

export const TicTacToePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="TicTacToePage">
      <h1>{t("TIC-TAC-TOE")}</h1>
      <TicTacToeRender />
      <Button text={t("BACK")} action={() => navigate("/")} />
    </div>
  );
};
