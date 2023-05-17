import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";

export default function CircularIntegration({
  image,
  imagesUrl,
  videoUrl,
  PostText,
  setImage,
  Media,
  children,
  func,
  LOADING,
  success,
  setLOADING,
  setSuccess,
  ID,
}) {
  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mt: 1.5, position: "relative" }}>
        <Button
          variant="contained"
          sx={{ buttonSx, width: "100%" }}
          disabled={LOADING}
          onClick={() => {
            setLOADING(true);
            func(JSON.parse(localStorage.getItem("user")).sub , ID);
            func("AllPosts", ID);
          }}
        >
          {children}
        </Button>
        {LOADING && (
          <CircularProgress
            size={24}
            sx={{
              color: blue[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
