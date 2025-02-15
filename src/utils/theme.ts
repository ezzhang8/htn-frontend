// theme.ts
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Components {
    MuiTimelineDot?: {
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    },
    MuiTimelineConnector?: {
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };

  }
}

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#121212",
        paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "15px", // Apply border-radius to all Card components
            boxShadow: mode === "light" ? "0px 0px 10px rgba(0,0,0,0.1)" : "0px 0px 10px rgba(0,0,0,0.3)", // Optional: Custom shadow
          },
        },
      },
      MuiTimelineDot: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#808080" : "#fffffff", // Custom color
            width: "15px", // Custom size
            height: "15px",
            margin: 0,
            boxShadow: "none", // Remove default shadow
          },
        },
      },
      MuiTimelineConnector: {
        styleOverrides: {
          root: {
            background: "none",
            borderLeft: mode === "light" ? "0.125rem dashed #808080" : "0.125rem dashed white", // Custom border
            margin: 0
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            height: "30px",
            width: "30px",
          },
        },
      },

    }

  });
