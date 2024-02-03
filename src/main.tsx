import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { LayoutProvider } from "./modules/layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </React.StrictMode>
);
