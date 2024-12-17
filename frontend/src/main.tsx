import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router";
import { RouterComponent } from "./router/router.tsx";

import "./i18next/index.ts";
import { AppContextProvider } from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <HashRouter>
        <RouterComponent />
      </HashRouter>
    </AppContextProvider>
  </StrictMode>
);
