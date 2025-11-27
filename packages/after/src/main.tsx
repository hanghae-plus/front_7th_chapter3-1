import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";

// 초기 다크모드 설정
const initializeDarkMode = () => {
  const saved = localStorage.getItem("darkMode");
  const isDark =
    saved !== null
      ? saved === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

initializeDarkMode();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
