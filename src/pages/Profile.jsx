
import {
  Box,
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
import { useParams } from "react-router";
import { db } from "../../firebase/config";
import { useDocument } from "react-firebase-hooks/firestore";
 import { doc } from "firebase/firestore";
 import ProfileLoading from '../components/loadingProfile'
const Root = (props) => {
  const { uId } = useParams();
  const [value, loading] = useDocument(doc(db, "AllUsers", uId));
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
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,
          minHeight: "100vh !important",
        }}
      >
        {/* Appbar is landing here */}
        <Appbar
          showList={showList}
          setshowList={setshowList}
          handleDrawerToggle={handleDrawerToggle}
        />
      <Box
          className = "Post"
            style={{
              paddingTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width:"100%",
              border:{sm:"10px solid red !important"}
            }}
          >
            {loading ? <ProfileLoading theme = {theme}/> : (
              <div style={{  display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"}}>
                <img
              src={value?.data()?.picture}
              alt="Image"
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
              {value?.data()?.name}
            </h1>
              </div>
            )}
          </Box>
      
        <Stack direction="row">
          <DRAWER
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            props={props}
            theme={theme}
            mode={mode}
            setmyMode={setmyMode}
          />
          <MainContent
            theme={theme}
            uid={uId}
          
          />

        </Stack>
        {/* Main content is landing here */}

        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
