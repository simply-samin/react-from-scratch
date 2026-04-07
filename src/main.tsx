import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { bootstrap } from "./bootstrap";
import "./app.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

bootstrap().then(() => {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
