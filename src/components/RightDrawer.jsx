import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, AvatarGroup, ImageList, ImageListItem, ListItemAvatar } from '@mui/material';

const drawerWidth = 500;
const itemData = [
  {
    img: "https://media.istockphoto.com/id/1326417843/photo/cheerful-woman-enjoying-coffee-cup-in-a-winter-afternoon.jpg?s=612x612&w=0&k=20&c=H7N-YP6y0_A3A2P2WJaKkebcwRQtiFGECpF7xXjpj6I=",
    title: "Breakfast",
  },
  {
    img: "https://media.istockphoto.com/id/1352185962/photo/shot-of-a-young-woman-cheering-while-using-a-laptop-to-study-at-home.jpg?s=612x612&w=0&k=20&c=4L5IL_4dO5iwGzxzcJYIiLCV9pj2sHoFDFgLU070dC8=",
    title: "Burger",
  },
  {
    img: "https://media.istockphoto.com/id/1068899450/photo/young-woman-with-hot-drink.jpg?s=612x612&w=0&k=20&c=FG1nbWegy5Cwp3Axfgm7spo0nb6Mj4N80ZtKdzq57YE=",
    title: "Camera",
  },
];

export default function PermanentDrawerRight({theme}) {
  return (
    <Box sx={{ display:{xs:"none", lg:"flex"} }}>
      <CssBaseline />
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <Box mt="20px" ml="20px ">
          <Typography
            variant="body1"
            sx={{ fontSize: "20px", fontWeight: "300" }}
          >
            Online Friends
          </Typography>
          {/* skelton if loadin */}
          <AvatarGroup sx={{ width: "200px", margin: "10px auto" }} total={24}>
            <Avatar
              sx={{ width: "45px", height: "45px" }}
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
            />
            <Avatar
              sx={{ width: "45px", height: "45px" }}
              alt="Travis Howard"
              src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=400"
            />
            <Avatar
              sx={{ width: "45px", height: "45px" }}
              alt="Agnes Walker"
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400"
            />
            <Avatar
              sx={{ width: "45px", height: "45px" }}
              alt="Trevor Henderson"
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400"
            />
          </AvatarGroup>
              
        </Box>
        <Box mt="20px" ml="20px ">
          <Typography
            variant="body1"
            sx={{ fontSize: "20px", fontWeight: "300" }}
          >
            Latest Photos
          </Typography>
          <ImageList
            sx={{ width: "100%", mt: "20px" }}
            cols={3}
            rowHeight={164}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img} sx={{ mr: "7px" }}>
                <img
                  style={{ borderRadius: "10px" }}
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box mt="20px" ml="20px">
          <Typography
            variant="body1"
            sx={{ fontSize: "20px", fontWeight: "300" }}
          >
            Latest Conversations
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: "97%", bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://media.istockphoto.com/id/654271696/photo/break-up-letter.jpg?s=612x612&w=0&k=20&c=pl8bNxXmPtr4kMrpv5tKU1A2JUM1HIKHObTDKUyQWaI="
                />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Travis Howard"
                  src="https://media.istockphoto.com/id/872828798/photo/weekends-were-made-to-mellow-out.jpg?s=612x612&w=0&k=20&c=XXkkFTTX6TH0cIwMvo1dIi7iw-vaGSnxWu1a1kFJFbk="
                />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Cindy Baker"
                  src="https://media.istockphoto.com/id/1326417937/photo/serene-young-woman-looking-at-camera.jpg?s=612x612&w=0&k=20&c=G7srv4ZtHNaPM_k6AYC_c_uM0zKXgUxXgVJe4zE0We0="
                />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {" — Do you have Paris recommendations?"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}