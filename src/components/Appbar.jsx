/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import Notifications from "./Notifications";
import SearchBar from "./SearchBar";

export default function PrimarySearchAppBar({
  showList,
  setshowList,
  handleDrawerToggle,
  theme,
}) {
  const navigate = useNavigate();

  const { picture } = JSON.parse(localStorage.getItem("user"));
  const { name } = JSON.parse(localStorage.getItem("user"));
  const { sub } = JSON.parse(localStorage.getItem("user"));

  return (
    <Box >
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - 240px)` },
          // ml: { sm: `240px` },
          backgroundColor: "#185de5",
          zIndex: "1300px",
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <SearchBar theme={theme} />
          <Box sx={{flexGrow:{xs:"1"}}}/>
          <Box
            sx={{
              display: "flex" , alignItems:"center" , justifyContent:"flex-end"
            }}
          >
            <Notifications />
            <div style={{width:"100% !important"}}>
              <IconButton
                sx={{ width: "60px", height: "60px" }}
                size="large"
                edge="end"
                onClick={() => {
                  localStorage.setItem(
                    "CurrUser",
                    JSON.stringify({
                      name: name,
                      picture: picture,
                    })
                  );
                  navigate(`/profile/${sub}`);
                }}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <Avatar
                  alt={JSON.parse(localStorage.getItem("user")).name}
                  src={JSON.parse(localStorage.getItem("user"))?.picture}
                >
                  {JSON.parse(localStorage.getItem("user")).picture}
                </Avatar>
              </IconButton>
            </div>
        
          </Box>

          
        </Toolbar>
        <Divider />
      </AppBar>
    </Box>
  );
}
