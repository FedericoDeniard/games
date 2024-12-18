import { useNavigate } from "react-router";
import { Button } from "../../components/button";
import { useTranslation } from "react-i18next";
import { SimonRender } from "../../games/Simon/render";
import { clearAllTimeouts } from "../../utils";

export const SimonPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1>Simon</h1>
      <SimonRender />
      <Button
        text={t("BACK")}
        action={() => {
          navigate("/");
          clearAllTimeouts();
        }}
      />
    </div>
  );
};
