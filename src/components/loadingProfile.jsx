/* eslint-disable react/prop-types */
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SkeletonColor({theme}) {
  return (
   <Box sx={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center" ,   backgroundColor:
   theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,}}> 
    <Box
      sx={{
        backgroundColor:
        theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,
        p:"0 5px 10px 0",
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        sx={{   backgroundColor:
          theme.palette.mode === "light" ? "#999" : "grey.900", }}
        variant="circular"
        width={150}
        height={150}
      />
      
    </Box>
    <Typography sx={{textAlign:"center"}} variant="h5"><Skeleton width={150}/> </Typography>

   </Box>
  );
}