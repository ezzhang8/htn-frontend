"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { redirect } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Modal,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const StyledToolbar = styled(Toolbar)(({}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  outline: "none",
  borderRadius: "20px",
};

import { useAuth } from "@/components/auth/AuthContext";
type NavbarProps = {
  back?: boolean;
};
export default function Navbar({ back }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuth();

  return (
    <AppBar
      position="static"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2>Login</h2>
          <Box
            component="form"
            onSubmit={() => {}}
            sx={{ mb: 2, width: "100%", alignItems: "center" }}
          >
            <Stack spacing={1}>
              <TextField
                fullWidth
                size="small"
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                size="small"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
          </Box>

          <Button
            type="submit"
            fullWidth
            onClick={() => {
              user.login(username, password);
            }}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Modal>

      <Container>
        <StyledToolbar variant="dense" disableGutters>
          {back && (
            <IconButton onClick={() => redirect("/events")} color="primary">
              <ArrowBackIcon />
            </IconButton>
          )}

          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          ></Box>
          <Box
            sx={{
              gap: 1,
              alignItems: "center",
            }}
          >
            <ThemeToggle />
            <Button
              onClick={
                user.logged_in ? () => user.logout() : () => setOpen(true)
              }
              color="primary"
              variant="contained"
              size="small"
            >
              {user.logged_in ? "Logout" : "Login"}
            </Button>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
