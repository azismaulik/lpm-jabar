import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BansosDataProvider } from "./components/DataProvider.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BansosDataProvider>
        <App />
      </BansosDataProvider>
    </BrowserRouter>
  </StrictMode>
);
