/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateCurrentUser } from "firebase/auth";
import SearchResults from "./postModal/SearchResults";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width:"100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export default function PrimarySearchAppBar({
  showList,
  setshowList,
  handleDrawerToggle,
  theme
}) {
  const [filterAccounts , setfilterAccounts] = React.useState('')
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [OpenSearchMenu, setOpenSearchMenu] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleSearch = (e) => {
    setfilterAccounts(e.target.value)
  }
  const handleFocus = (e) =>{
    setOpenSearchMenu(true)
  }
  const handleBlur = event => {
    setTimeout(() => {
      setOpenSearchMenu(false)
    }, 500);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const {picture} = JSON.parse(localStorage.getItem("user"));
  const {name} = JSON.parse(localStorage.getItem("user"));
  const {sub} = JSON.parse(localStorage.getItem("user"));
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => {  
        navigate(`/profile/${sub}`);
        handleProfileMenuOpen();
      }}>
        <IconButton
         
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar src={picture} alt={picture} sx={{ width: 32, height: 32 }}>picture</Avatar>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box>
      <AppBar
        
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 240px)` },
          // ml: { sm: `240px` },
          backgroundColor: "#185de5",
          zIndex:"1300px"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          


        <Box sx={{display:"flex" , flexDirection:"column" , position:"relative" , width:"600px"}}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            {OpenSearchMenu && <SearchResults Search={filterAccounts.trim().toLocaleLowerCase()} theme={theme}/>}
            </Search>
        </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <IconButton
              sx={{ width: "50px", height: "50px" }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ width: "50px", height: "50px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
        
              <IconButton
                sx={{ width: "60px", height: "60px" }}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  navigate(`/profile/${sub}`)
                  handleProfileMenuOpen()
                }}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <Avatar
                  alt={
                    JSON.parse(localStorage.getItem("user")).name
                  }
                  src={JSON.parse(localStorage.getItem("user"))?.picture}
                >
                  {JSON.parse(localStorage.getItem("user")).picture}
                </Avatar>
              </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider/>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
      
    </Box>
  );
}
