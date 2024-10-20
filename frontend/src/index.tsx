import ReactDOM from "react-dom/client";
import App from "./app/App";
import { StrictMode } from "react";
import "./app/styles/index.css";
import { StoreProvider } from "./app/providers/StoreProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
);
