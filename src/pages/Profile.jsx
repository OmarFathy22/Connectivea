/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Appbar from "../components/Appbar";
import React, { useMemo, useState } from "react";
import { Outlet } from "react-router";
import getDesignTokens from "../styles/MyTheme";
import MainContent from "../components/MainContent";
import DRAWER from "../components/DRAWER";
// import RightDrawer from "../components/RightDrawer";
import { useParams } from "react-router";
const Root = (props) => {
  const { uId } = useParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setMedia(null);
      setUPLOAD(null);
      setPostText("");
      setMediaName("");
      setFEELING("");
    }, 500);
  };

  const [showList, setshowList] = useState("none");
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
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,
          minHeight: "100vh !important",
        }}
      >
        {/* Appbar is landing here */}
        {/* <Appbar
          showList={showList}
          setshowList={setshowList}
          handleDrawerToggle={handleDrawerToggle}
        /> */}
        <Box
        className = "Post"
          style={{
            paddingTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border:{sm:"10px solid red"}
          }}
        >
          <img
            src={JSON.parse(localStorage.getItem("CurrUser")).picture}
            alt="Profile Image"
            // className="ShadowForProfile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <h1
            style={{
              textAlign: "center",
              backgroundColor:
                theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,
            }}
          >
            {JSON.parse(localStorage.getItem("CurrUser")).name}
          </h1>
        </Box>

        <Stack direction="row">
          <DRAWER
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            props={props}
            theme={theme}
            mode={mode}
            setmyMode={setmyMode}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
          <MainContent
            theme={theme}
            uid={uId}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
          {/* <RightSection theme={theme} /> */}
          {/* <RightDrawer theme={theme} /> */}
        </Stack>
        {/* Main content is landing here */}

        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
