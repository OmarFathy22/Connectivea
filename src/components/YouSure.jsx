/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius:"5px",
  boxShadow: 12,
  p: 4,
};

export default function BasicModal({dofunction , open , setOpen , text}) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{textAlign:"center" , fontSize:"15px"}} id="modal-modal-title" variant="h6" component="h2">
            {text}
          </Typography>
          <Box sx={{display:"flex" , justifyContent:"center" , alignItem:"center" , gap:"120px" , marginTop:"50px"}}>
           <Button variant='contained' onClick={() => {
            dofunction()
            setTimeout(() => {
              handleClose()
            }, 500);
           }}>YES</Button>
           <Button variant='contained'onClick={handleClose} style={{backgroundColor:"#888"}}>NO</Button>
          </Box>
          </Box>
        
      </Modal>
    </div>
  );
}
