import React from 'react';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import SearchResults from "./postModal/SearchResults";
import Box from "@mui/material/Box";

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


const SearchBar = ({theme}) => {
  const [OpenSearchMenu, setOpenSearchMenu] = React.useState(false);
  const [filterAccounts , setfilterAccounts] = React.useState('')

  const handleSearch = (e) => {
    setfilterAccounts(e.target.value)
  }
  const handleFocus = () =>{
      setOpenSearchMenu(true)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setOpenSearchMenu(false)
    }, 200);
  };
  return (
    <Box sx={{display:"flex" , flexDirection:"column" , position:"relative" , width:{xs:"230px" , sm:"700px"}}}>
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
  );
}

export default SearchBar;
