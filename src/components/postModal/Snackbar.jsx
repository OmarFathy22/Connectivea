import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";

export default function SimpleSnackbar({ OPEN, setOPEN , Message , time , y , x  }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOPEN(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Stack>
      <Snackbar
        anchorOrigin={ {vertical: y, horizontal: x}}
        open={OPEN}
        autoHideDuration={time}
        onClose={handleClose}
        message= {Message}
        action={action}
        sx={{borderRadius:"4px" }}
      />
      </Stack>
    </div>
  );
}
