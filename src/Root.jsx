/* eslint-disable no-undef */
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Outlet } from "react-router";
import getDesignTokens from "./styles/MyTheme";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect } from "react";

import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import VideoBackground from "./components/VideoBackground";

const Root = (props) => {
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    const handleGoogleApiLoad = () => {
      google.accounts.id.initialize({
        client_id:
          "646245005567-1a33npebn0q9i0sbdnanqqotpr216gjc.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    };
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = handleGoogleApiLoad;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCallbackResponse = async (response) => {
    const UserObject = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(UserObject));
    setuser(UserObject);
  };

  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {Object.keys(user).length === 0 && (
        <VideoBackground>
          <div id="signInDiv"></div>
        </VideoBackground>
      )}
      {Object.keys(user).length !== 0 && (
        <Box>
          {/* <Appbar
          showList={showList}
          setshowList={setshowList}
          handleDrawerToggle={handleDrawerToggle}
        /> */}
          <Outlet />
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Root;
