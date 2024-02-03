import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { LayoutProvider } from "./modules/layout";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Could not find root element");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </React.StrictMode>
  );
}
