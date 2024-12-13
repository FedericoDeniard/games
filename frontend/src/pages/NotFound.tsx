import { useNavigate } from "react-router";
import { Button } from "../components/button";
import { useTranslation } from "react-i18next";
import "./index.css";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>{t("ERROR")}</h1>
      <p>{t("NOT_FOUND")}</p>
      <Button text={t("BACK")} action={() => navigate("/")} />
    </div>
  );
};
