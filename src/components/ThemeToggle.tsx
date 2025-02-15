// components/ThemeToggle.tsx
"use client";

import { useTheme } from "./ThemeProvider";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggle() {
  const { toggleTheme, mode } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}