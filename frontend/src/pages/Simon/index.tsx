import { useNavigate } from "react-router";
import { Button } from "../../components/button";
import { useTranslation } from "react-i18next";

export const SimonPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>Simon</h1>
      <Button text={t("BACK")} action={() => navigate("/")} />
    </div>
  );
};
