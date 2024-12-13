import { Route, Routes } from "react-router";
import App from "../App";
import { NotFoundPage } from "../pages/NotFound";

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
