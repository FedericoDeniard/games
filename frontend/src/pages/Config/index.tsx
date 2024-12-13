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
    <div className="container">
      <h1>Settings</h1>
      <div className="settings-container">
        <div className="input-container">
          <span>Sound</span>
          <div className="checkbox-wrapper-8">
            <input
              className="tgl tgl-skewed"
              id="cb3-8"
              type="checkbox"
              checked={sound}
              onChange={(e) => setSound(e.target.checked)}
            />
            <label
              className="tgl-btn"
              data-tg-off="OFF"
              data-tg-on="ON"
              htmlFor="cb3-8"
            ></label>
          </div>
        </div>
      </div>
      <Button text={t("BACK")} action={() => navigate("/")} />
    </div>
  );
};
