/* eslint-disable react/prop-types */

import onlap from '../Video/video.mp4'
import onMobile from '../Video/onMobile.mp4'
import { useState , useEffect } from 'react';
function VideoBackground({children}) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <div>
      <video  width="300"
              height="300"
               autoPlay muted loop id="myVideo" src={width <= 900 ? onMobile : onlap}
               style={{ opacity:"0.5", position: "fixed", width: "100%", height: "100%", objectFit: "cover", zIndex: "-1" }}
               >
        Your browser does not support HTML video.
      </video>
      <div style={{position:'absolute', width: "100%", height: "100%", display:"flex" , flexDirection:"column" , gap: '50px' , justifyContent:"center" , alignItems:"center"}}>
          <h1 style={{textAlign:"center"}}>WELCOME TO <span style={{color:"cyan"}}>CONNECTIVEA</span></h1>
        {children}
      </div>
    
    </div>
  )
}

export default VideoBackground;