import { useTranslation } from "react-i18next";

export const TicTacToePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("TIC-TAC-TOE")}</h1>
    </div>
  );
};
