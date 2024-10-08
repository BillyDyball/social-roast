import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import AuthProvider from "./components/auth-provider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
