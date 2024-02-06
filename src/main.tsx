import ReactDOM from "react-dom/client";
import * as React from "react";

import { LayoutProvider } from "@/modules/layout";

import App from "./App.tsx";

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
