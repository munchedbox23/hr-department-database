import ReactDOM from "react-dom/client";
import App from "./app/App";
import { StrictMode } from "react";
import "./app/styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
