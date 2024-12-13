import { Route, Routes } from "react-router";
import App from "../App";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { TicTacToePage } from "../pages/Tic-Tae-Toe";
import { SettingsPage } from "../pages/Config";

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<App />} />
      <Route path="/tic-tac-toe" element={<TicTacToePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};
