import { Route, Routes } from "react-router";
import App from "../App";
import { NotFoundPage } from "../pages/NotFound";
import { TicTacToePage } from "../pages/Tic-Tae-Toe";

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<App />} />
      <Route path="/tic-tac-toe" element={<TicTacToePage />} />
    </Routes>
  );
};
