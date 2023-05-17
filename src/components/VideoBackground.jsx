/* eslint-disable react/prop-types */

import Video from '../Video/video.mp4'
function VideoBackground({children}) {
  return (
    <div>
      <video width="300"
              height="300"
               autoPlay muted loop id="myVideo" src={Video}
               style={{ opacity:"0.5", position: "fixed", width: "100%", height: "100%", objectFit: "cover", zIndex: "-1" }}
               >
        Your browser does not support HTML video.
      </video>
      <div style={{position:'absolute', width: "100%", height: "100%", display:"flex" , flexDirection:"column" , gap: '50px' , justifyContent:"center" , alignItems:"center"}}>
          <h1>WELCOME TO POSTATI</h1>
        {children}
      </div>
    
    </div>
  )
}

export default VideoBackground;