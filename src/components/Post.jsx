/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate, useLocation } from "react-router";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import {updateDoc} from "firebase/firestore";
function Post({
  theme,
  deletePost,
  post,
  uid,

}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const DeleteListOfLikes = async (id , uId , ListOfLikes ) => {
    let Data = [];
     Data =  ListOfLikes
    Data.splice(Data.indexOf(sub) , 1)
    await updateDoc(doc(db,uId, id), {
      ListOfLikes: ListOfLikes.length ? Data : []
     });
  };
  const AddListOfLikes = async (id , uId , ListOfLikes ) => {
    let Data = [];  
    Data =  ListOfLikes
    Data.push(sub);
    await updateDoc(doc(db,uId, id), {
      ListOfLikes: Data
     });
  };
  const DeleteListOfBookmarks = async (id , uId , ListOfBookmarks ) => {
    let Data = [];
     Data =  ListOfBookmarks
    Data.splice(Data.indexOf(sub) , 1)
    await updateDoc(doc(db,uId, id), {
      ListOfBookmarks: ListOfBookmarks.length ? Data : []
     });
  };
  const AddListOfBookmarks = async (id , uId , ListOfBookmarks ) => {
    let Data = [];  
    Data =  ListOfBookmarks
    Data.push(sub);
    await updateDoc(doc(db,uId, id), {
      ListOfBookmarks: Data
     });
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { sub } = JSON.parse(localStorage.getItem("user"));
  return (
    <Card
      key={post.date}
      sx={{ maxWidth: 450, mr: "auto", ml: "auto", mb: "90px" }}
    >
      <CardHeader
        avatar={
          <Avatar
            onClick={() => {
                localStorage.setItem(
                  "CurrUser",
                  JSON.stringify({
                    name: post.data().name,
                    picture: post?.data()?.picture,
                  })
                );
                navigate(`/profile/${post.data().uId}`);
              }
            }
            sx={{
              color: theme.palette.getContrastText(post.data().color),
              bgcolor: post.data().color,
              cursor: "pointer",
            }}
            aria-label="recipe"
            alt={post.data().picture}
            src={post.data().picture}
          >
            {post.data().name.charAt()}
          </Avatar>
        }
        action={
          <Box component="article">
            <IconButton
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => {
                handleClick(e);
              }}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        }
        title={
          !post.data().feeling ? (
            <Typography
              onClick={() => {
                if (location.pathname === "/") {
                  localStorage.setItem(
                    "CurrUser",
                    JSON.stringify({
                      name: post.data().name,
                      picture: post.data().picture,
                    })
                  );
                  navigate(`/profile/${post.data().uId}`);
                }
              }}
              sx={{ fontWeight: "300", cursor: "pointer" }}
              variant="body1"
              color="inherit"
            >
              {post.data().name}{" "}
            </Typography>
          ) : (
            <Stack direction="row">
              <Typography
                onClick={() => {
                  if (location.pathname === "/") {
                    localStorage.setItem(
                      "CurrUser",
                      JSON.stringify({
                        name: post.data().name,
                        picture: post.data().picture,
                      })
                    );
                    navigate(`/profile/${post.data().uId}`);
                  }
                }}
                sx={{ fontWeight: "300", cursor: "pointer" }}
                variant="body1"
                color="inherit"
              >
                {post.data().name}
              </Typography>
              <Typography
                sx={{
                  ml: "5px",
                  color: theme.palette.primary.main,
                  fontWeight: "500",
                }}
                variant="body1"
                color="inherit"
              >
                feels{" "}
              </Typography>
              <Typography
                sx={{
                  ml: "5px",
                  textTransform: "capitalize",
                  fontWeight: "500",
                }}
                variant="body1"
                color="inherit"
              >
                {post.data().feeling}{" "}
              </Typography>
            </Stack>
          )
        }
        subheader={post.data().date}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {uid === JSON.parse(localStorage.getItem("user")).sub && (
          <MenuItem
            sx={{ p: "5px 30px" }}
            onClick={() => {
              handleClose();
              deletePost(post.id);
            }}
          >
            Delete
          </MenuItem>
        )}
        <MenuItem sx={{ p: "5px 30px" }} onClick={handleClose}>
          Edit
        </MenuItem>
      </Menu>
      <CardContent>
        <Typography
          dir="auto"
          component="span"
          variant="body2"
          color="text.secondary"
        >
          {post.data().body}
        </Typography>
      </CardContent>
      {post.data().mediaType === "image" && (
        <CardMedia
          component="img"
          height="300"
          image={post.data().media}
          alt="Paella dish"
        />
      )}
      {post.data().mediaType === "video" && (
        <video src={post.data().media} width="100%" height="300" controls>
          Your browser does not support HTML video.
        </video>
      )}

      <CardActions disableSpacing>
        <span>{post.data().ListOfLikes.length}</span>
        <Checkbox
          // hover
          sx={{
            "&:hover": {
              backgroundColor: {
                xs: "transparent",
                md: "rgba(255, 255, 255, 0.08)",
              },
            },
          }}
          checked={post.data().ListOfLikes.includes(sub)}
          onChange={() => {
            if(post.data().ListOfLikes.includes(sub))
            {
               DeleteListOfLikes(post.data().id , post.data().uId , post.data().ListOfLikes)
               DeleteListOfLikes(post.data().id , "AllPosts" , post.data().ListOfLikes)
            }
            else{
              AddListOfLikes(post.data().id , post.data().uId , post.data().ListOfLikes)
              AddListOfLikes(post.data().id , "AllPosts" , post.data().ListOfLikes)
            }
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
        />
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: {
                xs: "transparent",
                md: "rgba(255, 255, 255, 0.08)",
              },
            },
          }}
          aria-label="share"
        >
          <ShareIcon />
        </IconButton>
        <Box sx={{ flexGrow: "1" }} />
        {uid === JSON.parse(localStorage.getItem("user")).sub && (
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: {
                  xs: "transparent",
                  md: "rgba(255, 255, 255, 0.08)",
                },
              },
            }}
            onClick={() => {
              deletePost(post.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <Checkbox
          sx={{
            "&:hover": {
              backgroundColor: {
                xs: "transparent",
                md: "rgba(255, 255, 255, 0.08)",
              },
            },
          }}
          onChange={() => {
            if(post.data().ListOfBookmarks.includes(sub))
            {
              DeleteListOfBookmarks(post.data().id , post.data().uId , post.data().ListOfBookmarks)
              DeleteListOfBookmarks(post.data().id , "AllPosts" , post.data().ListOfBookmarks)
            }
            else{
              AddListOfBookmarks(post.data().id , post.data().uId , post.data().ListOfBookmarks)
              AddListOfBookmarks(post.data().id , "AllPosts" , post.data().ListOfBookmarks)
            }
          }}
          checked={post.data().ListOfBookmarks.includes(sub)}
          icon={<BookmarkBorderOutlinedIcon />}
          checkedIcon={<BookmarkIcon />}
        />
      </CardActions>
    </Card>
  );
}

export default Post;
