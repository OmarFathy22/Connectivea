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
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate, useLocation } from "react-router";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { updateDoc } from "firebase/firestore";
import ReplyIcon from "@mui/icons-material/Reply";
import { getDoc, setDoc } from "firebase/firestore";
import YouSure from './YouSure'
import ShareSnack from './postModal/Snackbar'

function Post({ theme, deletePost, post, uid, ID }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [OpenShareModal, setOpenShareModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [shareSnackbar, setshareSnackbar] = useState(false);
  const [deleteSnackbar, setdeleteSnackbar] = useState(false);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { sub } = JSON.parse(localStorage.getItem("user"));
  const { name } = JSON.parse(localStorage.getItem("user"));
  const { picture } = JSON.parse(localStorage.getItem("user"));
  const newData = {
    uId: sub,
    id: ID,
    color: "#30E3DF",
    liked: false,
    likes: 0,
    clickedlike: false,
    ListOfLikes: [],
    ListOfBookmarks: [],
    counter: 0,
    bookmarked: false,
    shared: true,
  };
  const DeleteListOfLikes = async (id, uId, ListOfLikes) => {
    let Data = [];
    Data = ListOfLikes;
    Data?.splice(Data.indexOf(sub), 1);
    await updateDoc(doc(db, uId, id), {
      ListOfLikes: ListOfLikes.length ? Data : [],
    });
  };
  const AddListOfLikes = async (id, uId, ListOfLikes) => {
    let Data = [];
    Data = ListOfLikes;
    Data?.push(sub);
    await updateDoc(doc(db, uId, id), {
      ListOfLikes: Data,
    });
  };
  const DeleteListOfBookmarks = async (id, uId, ListOfBookmarks) => {
    let Data = [];
    Data = ListOfBookmarks;
    Data.splice(Data.indexOf(sub), 1);
    await updateDoc(doc(db, uId, id), {
      ListOfBookmarks: ListOfBookmarks.length ? Data : [],
    });
  };
  const AddListOfBookmarks = async (id, uId, ListOfBookmarks) => {
    let Data = [];
    Data = ListOfBookmarks;
    Data?.push(sub);
    await updateDoc(doc(db, uId, id), {
      ListOfBookmarks: Data,
    });
  };
  const updateNotification = async (id, uId, text , type) => {
    const docRef = doc(db, "AllUsers", id);
    const docSnap = await getDoc(docRef);
    let Data = [];
    Data = docSnap?.data()?.notification;
    if(id !== sub)
    {
      Data?.push({ name: name, uid: sub, picture: picture, id:post.data().id , text:text , type: type });
    }
    let Length = 0;
    if(id !== sub) {
      Length = docSnap?.data()?.Length + 1
    }
    if (docSnap.exists()) {
      await updateDoc(doc(db, "AllUsers", id), {
        notification: Data,
        Length : Length,
      });
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  

  async function shareDocument(
    sourceCollection,
    sourceDocId,
    targetCollection,
    targetDocId,
    newData
  ) {
    try {
      // Get reference to the source document
      const sourceDocRef = doc(db, sourceCollection, sourceDocId);

      // Get data from the source document
      const sourceDocSnapshot = await getDoc(sourceDocRef);

      if (!sourceDocSnapshot.exists()) {
        return;
      }

      const sourceDocData = sourceDocSnapshot.data();

      // Update the data of the copied document with the new data
      const updatedDocData = { ...sourceDocData, ...newData };

      // Create a new document in the target collection with the updated data
      const targetDocRef = doc(db, targetCollection, targetDocId);
      await setDoc(targetDocRef, updatedDocData);
      setshareSnackbar(true)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card
      key={post.date}
      sx={{
        maxWidth:"750px",
        mr: "auto",
        ml: "auto",
        mb: "90px",
        position: "relative",
      }}
    >
      {post.data().shared && (
        <Box
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <ReplyIcon style={{fontSize:"12px"}}/> <span style={{fontSize:"12px"}}>Reposted</span>
        </Box>
      )}
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
              navigate(`/profile/${post?.data()?.uId}`);
            }}
            sx={{
              color: theme.palette.getContrastText(post?.data()?.color),
              bgcolor: post?.data()?.color,
              cursor: "pointer",
            }}
            aria-label="recipe"
            alt={post?.data()?.picture}
            src={post?.data()?.picture}
          >
            {post?.data()?.name.charAt()}
          </Avatar>
        }
        // action={
        //   <Box component="article">
        //     <IconButton
        //       aria-controls={open ? "fade-menu" : undefined}
        //       aria-haspopup="true"
        //       aria-expanded={open ? "true" : undefined}
        //       onClick={(e) => {
        //         handleClick(e);
        //       }}
        //       aria-label="settings"
        //     >
        //       <MoreVertIcon />
        //     </IconButton>
        //   </Box>
        // }
        title={
          !post?.data()?.feeling ? (
            <Typography
              onClick={() => {
                if (location.pathname === "/") {
                  localStorage.setItem(
                    "CurrUser",
                    JSON.stringify({
                      name: post?.data()?.name,
                      picture: post?.data()?.picture,
                    })
                  );
                  navigate(`/profile/${post?.data()?.uId}`);
                }
              }}
              sx={{ fontWeight: "300", cursor: "pointer" }}
              variant="body1"
              color="inherit"
            >
              {post?.data()?.name}{" "}
            </Typography>
          ) : (
            <Stack direction="row">
              <Typography
                onClick={() => {
                  if (location.pathname === "/") {
                    localStorage.setItem(
                      "CurrUser",
                      JSON.stringify({
                        name: post?.data()?.name,
                        picture: post?.data()?.picture,
                      })
                    );
                    navigate(`/profile/${post?.data()?.uId}`);
                  }
                }}
                sx={{ fontWeight: "300", cursor: "pointer" }}
                variant="body1"
                color="inherit"
              >
                {post?.data()?.name}
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
                {post?.data()?.feeling}{" "}
              </Typography>
            </Stack>
          )
        }
        subheader={post?.data()?.date}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {uid ===sub && (
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
          color="white"
        >
          {post?.data()?.body}
        </Typography>
      </CardContent>
      {post?.data()?.mediaType === "image" && (
        <CardMedia
          component="img"
          max-height="300"
          image={post?.data()?.media}
          alt="Paella dish"
          style={{maxHeight:"400px" , objectFit:"contain" , backgroundColor:"transparent !important"}}
          
        />
      )}
      {post?.data()?.mediaType === "video" && (
        <video src={post?.data()?.media} width="100%" height="300" controls>
          Your browser does not support HTML video.
        </video>
      )}

      <CardActions disableSpacing>
        <span>{post?.data()?.ListOfLikes.length}</span>
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
          checked={post?.data()?.ListOfLikes.includes(sub)}
          onChange={() => {
            if (post?.data()?.ListOfLikes.includes(sub)) {
              DeleteListOfLikes(
                post?.data()?.id,
                post?.data()?.uId,
                post?.data()?.ListOfLikes
              );

              if (!post?.data()?.shared) {
                DeleteListOfLikes(
                  post.data().id,
                  "AllPosts",
                  post.data().ListOfLikes
                );
              }
            } else {
              AddListOfLikes(
                post?.data()?.id,
                post?.data()?.uId,
                post?.data()?.ListOfLikes
              );
              updateNotification(
                post?.data()?.uId,
                "AllUsers",
                "loves your post",
                "love"
              );
              if (!post?.data()?.shared) {
                AddListOfLikes(
                  post?.data()?.id,
                  "AllPosts",
                  post?.data()?.ListOfLikes
                );
              }
            }
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
        />
        <IconButton
          onClick={() => {
            setOpenShareModal(true)
          }}
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
      
        <YouSure dofunction={() => {
          updateNotification(
            post?.data()?.uId,
            "AllUsers",
            "shared your post",
            "share"
          );
          shareDocument(post?.data()?.uId, post?.data()?.id, sub, ID, newData);
        }} open ={OpenShareModal} setOpen={setOpenShareModal} text={"Are You sure you want to share this Post?"}/>
        <ShareSnack
        OPEN={shareSnackbar}
        setOPEN={setshareSnackbar}
        Message={"Post Shared Successfully!"}
        time={1000}
        y={"top"}
        x={"center"}
      />
        <Box sx={{ flexGrow: "1" }} />
        {(uid === sub && location.pathname === `/profile/${sub}`) && (
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
              setOpenDeleteModal(true)
            }}
          >
            <DeleteIcon />
          </IconButton>
          
        )}
        <YouSure dofunction={() => {
          deletePost(post?.id)
          setdeleteSnackbar(true)
        }} open={OpenDeleteModal} setOpen={setOpenDeleteModal} text={"Are you sure you want to delete this Post?"}/>
          <ShareSnack
        OPEN={deleteSnackbar}
        setOPEN={setdeleteSnackbar}
        Message={"Post deleted Successfully!"}
        time={1000}
        y={"top"}
        x={"center"}
      />
        {(location.pathname === "/" || location.pathname === '/bookmarks') && (
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
              if (post.data().ListOfBookmarks.includes(sub)) {
                DeleteListOfBookmarks(
                  post?.data()?.id,
                  post?.data()?.uId,
                  post?.data()?.ListOfBookmarks
                );
                if (!post?.data()?.shared) {
                  DeleteListOfBookmarks(
                    post?.data()?.id,
                    "AllPosts",
                    post?.data()?.ListOfBookmarks
                  );
                }
              } else {
                AddListOfBookmarks(
                  post?.data()?.id,
                  post?.data()?.uId,
                  post?.data()?.ListOfBookmarks
                );
                if (!post?.data()?.shared) {
                  AddListOfBookmarks(
                    post?.data()?.id,
                    "AllPosts",
                    post?.data()?.ListOfBookmarks
                  );
                }
              }
            }}
            checked={post?.data()?.ListOfBookmarks.includes(sub)}
            icon={<BookmarkBorderOutlinedIcon />}
            checkedIcon={<BookmarkIcon />}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default Post;