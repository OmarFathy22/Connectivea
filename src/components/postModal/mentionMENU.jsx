import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
const ITEM_HEIGHT = 38;
// const mentions = [
//   {
//     IconLetter: "O",
//     Iconbgcolor: "#245953",
//     name: "Omar Fathy",
//     id: "1",
//   },
//   {
//     IconLetter: "A",
//     Iconbgcolor: "#FE6244",
//     name: "Ahmed Fathy",
//     id: "2",
//   },
//   {
//     IconLetter: "M",
//     Iconbgcolor: "#BBD6B8",
//     name: "Mohamed Fathy",
//     id: "3",
//   },
//   {
//     IconLetter: "S",
//     Iconbgcolor: "#FC2947",
//     name: "Sayed Fathy",
//     id: "4",
//   },
//   {
//     IconLetter: "M",
//     Iconbgcolor: "#9A208C",
//     name: "Mariem Fathy",
//     id: "5",
//   },
//   {
//     IconLetter: "S",
//     Iconbgcolor: "#B8621B",
//     name: "Sondos Fathy",
//     id: "6",
//   },
//   {
//     IconLetter: "M",
//     Iconbgcolor: "#555",
//     name: "Mina Fathy",
//     id: "7",
//   },
//   {
//     IconLetter: "F",
//     Iconbgcolor: "#FDF7C3",
//     name: "Fareeda Fathy",
//     id: "8",
//   },
//   {
//     IconLetter: "A",
//     Iconbgcolor: "#FFB4B4",
//     name: "Alaa Fathy",
//     id: "9",
//   },
//   {
//     IconLetter: "E",
//     Iconbgcolor: "#B2A4FF",
//     name: "Eyad Fathy",
//     id: "10",
//   },
// ];

export default function LongMenu({ theme, EmoJiIcon, PostText, setPostText }) {
  const [value, loading, error] = useCollection(collection(db, "AllUsers"));
  const AllUsers = value?.docs;
  const filtered = AllUsers?.map((item) => item.data());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Add Mention" placement="bottom">
        <EmoJiIcon
          sx={{
            color: theme.palette.error.main,
            cursor: "pointer",
          }}
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        />
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "25ch",
          },
        }}
      >
        {filtered?.map((option) => (
          <MenuItem
            key={option.uid}
            onClick={(eo) => {
              handleClose();
              setPostText(PostText + " @" + option.name + " ");
            }}
          >
            <Typography>
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Avatar
                  src={option?.picture}
                >
                  
                </Avatar>
                <Typography
                  sx={{ ml: "15px", fontWeight: "100" }}
                  variant="body1"
                  color="inherit"
                >
                  {" "}
                  {option.name}
                </Typography>
              </Stack>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
