import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BansosDataProvider } from "./components/DataProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BansosDataProvider>
      <App />
    </BansosDataProvider>
  </StrictMode>
);
