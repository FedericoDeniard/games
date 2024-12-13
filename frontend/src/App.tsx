import { useTranslation } from "react-i18next";
import { Button } from "./components/button";
import { useNavigate } from "react-router";

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <h1>{t("HELLO")}</h1>
        <h4>{t("CHOOSE-GAME")}</h4>
        <Button
          action={() => navigate("/tic-tac-toe")}
          text={t("TIC-TAC-TOE")}
          color="#4B5C5E"
        />
      </div>
    </>
  );
}

export default App;
