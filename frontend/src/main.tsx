import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { RouterComponent } from "./router/router.tsx";

import "./i18next/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  </StrictMode>
);
