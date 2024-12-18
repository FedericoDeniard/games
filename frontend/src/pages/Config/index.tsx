import { useTranslation } from "react-i18next";
import { Button } from "../../components/button";
import { useAppConfig } from "../../context";
import "./index.css";
import { useNavigate } from "react-router";

export const SettingsPage = () => {
  const { t } = useTranslation();
  const { setSound, sound } = useAppConfig();
  const navigate = useNavigate();

  return (
    <div className="container settings-page">
      <h1>{t("SETTINGS")}</h1>
      <div className="settings-container">
        <div className="input-container">
          <div className="checkbox-wrapper-1">
            <input
              id="example-1"
              className="substituted"
              type="checkbox"
              aria-hidden="true"
              checked={sound}
              onChange={(e) => setSound(e.target.checked)}
            />
            <label htmlFor="example-1">{t("SOUND")}</label>
          </div>
        </div>
      </div>
      <Button text={t("BACK")} action={() => navigate("/")} />
    </div>
  );
};
