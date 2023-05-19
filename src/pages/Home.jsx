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
import RightDrawer from "../components/RightDrawer";
const Root = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      <Box>
        {/* Appbar is landing here */}
        {/* <Appbar
          showList={showList}
          setshowList={setshowList}
          handleDrawerToggle={handleDrawerToggle}
        /> */}
        <Stack direction="row">
          <DRAWER
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            props={props}
            theme={theme}
            mode={mode}
            setmyMode={setmyMode}
          />
          <MainContent theme={theme}  uid={"AllPosts"} />
          {/* <RightSection theme={theme} /> */}
          <RightDrawer theme={theme} />
        </Stack>
        {/* Main content is landing here */}

        <Outlet />
      </Box>

      {/* <Box sx={{display:"flex" , justifyContent:"center",  alignItems:"center" , height:"100vh" , border:"1px solid red"}}>
      <Button onClick={handleGoogle}>Sign with Google</Button>
      </Box> */}
    </ThemeProvider>
  );
};

export default Root;
