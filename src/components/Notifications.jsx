/* eslint-disable no-unused-vars */
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { updateDoc } from "firebase/firestore";
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function FadeMenu() {
  const {sub} = JSON.parse(localStorage.getItem("user")) || {};
  const [value, loading, error] = useDocument(doc(db,"AllUsers", sub || "100347238913223159278"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   if(error)console.log(error)
  //  if(loading)return <Loading/>
  const Data = value?.data()?.notification;
  Data?.reverse();
  return (
    <div style={{width:"100%"}}>
      <IconButton
              sx={{ width: "50px", height: "50px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={async(e) => {
                handleClick(e)
                await updateDoc(doc(db, "AllUsers", sub), {
                  Length : 0,
                });
              }}
            >
              <Badge badgeContent={value?.data()?.Length} color="error">
                  <NotificationsIcon />
              </Badge>
            </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {Data?.length > 0 && Data?.map((item , index) => {
          return(
            <MenuItem style={{display:"flex" , alignItems:"center"}}  key={index} onClick={handleClose}>
              <img style={{borderRadius:"50%" , marginRight:"5px"}} height={"30px"} width={"30px"} src={item?.picture} alt="image" />
              <h4 >{item?.name}</h4>
              <h4 style={{fontWeight:"30"  , fontSize:"15px",marginLeft:"10px"}}>{item?.text} </h4> 
              {item?.type === 'love' &&<span style={{padding:"5px 0 0 5px" }}><FavoriteIcon className='heart' fontSize='small' style={{color:"red"}}/></span>}
              {item?.type === 'share' &&<span style={{padding:"5px 0 0 5px" }}><ReplyIcon className='heart' fontSize='small'    /></span>}
            </MenuItem>
          )
        })}
        {value?.data()?.notification?.length < 1 &&   <MenuItem onClick={handleClose}>No Notifications yet</MenuItem>}
        
      </Menu>
    </div>
  );
}