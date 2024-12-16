import { Route, Routes } from "react-router";
import App from "../App";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { TicTacToePage } from "../pages/Tic-Tae-Toe";
import { SettingsPage } from "../pages/Config";
import { SimonPage } from "../pages/Simon";

export const TicTacToeRoutes = {
  solo: "/tic-tac-toe",
  ai: "/tic-tac-toe/ai",
};

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<App />} />
      <Route path={TicTacToeRoutes.solo} element={<TicTacToePage />} />
      <Route path={TicTacToeRoutes.ai} element={<TicTacToePage />} />
      <Route path="/simon" element={<SimonPage />} />

      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};
