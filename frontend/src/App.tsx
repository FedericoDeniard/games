import { useTranslation } from "react-i18next";
import { Button } from "./components/button";
import { useNavigate } from "react-router";
import "./App.css";

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <h1>{t("HELLO")}</h1>
        <h4>{t("CHOOSE-GAME")}</h4>
        <div className="container games-container">
          <Button
            action={() => navigate("/tic-tac-toe")}
            text={t("TIC-TAC-TOE")}
            color="#4B5C5E"
            width={150}
          />
          <Button
            action={() => navigate("/tic-tac-toe/ai")}
            text={t("TIC-TAC-TOE") + " vs " + t("AI")}
            color="#4B5C5E"
            width={150}
          />
          <Button
            action={() => navigate("/Simon")}
            text="Simon"
            color="#4B5C5E"
            width={150}
          />
          <Button
            action={() => navigate("/settings")}
            text={t("SETTINGS")}
            color="#4B5C5E"
            width={150}
          />
        </div>
      </div>
    </>
  );
}

export default App;
