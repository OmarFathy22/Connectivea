import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {  Stack, Tooltip, Typography } from "@mui/material";

const ITEM_HEIGHT = 38;
const feelings = [
  {
     icon: "",
     feeling: "no feeling",
     id:"0"
  },
  {
     icon: "😁",
     feeling: "great",
     id:"1"
  },
  {
     icon:"😊" ,
     feeling: "happy",
      id:"2"
  },
  {
     icon:"😍" ,
     feeling: "wonderful",
      id:"3"
  },
  {
     icon:"😉" ,
     feeling: "pretty",
     id:"4"
  },
  {
     icon:"😌" ,
     feeling: "good",
     id:"5"
  },
  {
     icon:"😆" ,
     feeling: "amused",
     id:"6"
  },
  {
     icon:"😎" ,
     feeling: "special",
     id:"7"
  },
  {
     icon:"😏" ,
     feeling: "exited",
     id:"8"
  },
  {
     icon:"😀" ,
     feeling: "better",
     id:"9"
  },
  {
     icon: "😔",
     feeling: "sad",
     id:"10"
  },
  {
     icon:"😕" ,
     feeling: "bad",
     id:"11"
  },
  {
     icon:"😒" ,
     feeling: "tired",
     id:"12"
  },
  {
     icon:"😞" ,
     feeling: "annoyed",
     id:"13"
  },
  {
     icon:"😟" ,
     feeling: "guilty",
     id:"14"
  },
  {
     icon:"😷" ,
     feeling: "sick",
     id:"15"
  },
  {
     icon:"😐" ,
     feeling: "meh",
     id:"16"
  }
];
export default function LongMenu({ theme, EmoJiIcon,setFEELING  }) {
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
            color: theme.palette.primary.main,
            cursor: "pointer",
            mr: "10px",
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
            width: "18ch",
          },
        }}
      >
        {feelings.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => {
              handleClose();
              if(option.feeling !== "no feeling")
              setFEELING(option.feeling + " " + option.icon);
              else
              setFEELING(null);
              
            }}
          >
            <Typography>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography variant="body1" color="initial">
                    {option.icon }
                  </Typography>
                  <Typography
                    sx={{ ml: "15px", fontWeight: "100" }}
                    variant="body1"
                    color="inherit"
                  >
                    {" "}
                    {option.feeling}
                  </Typography>
                </Stack>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
