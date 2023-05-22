import React from 'react';
import logo from '../c5.png'
const Loading = () => {
  return (
    <div style={{height:"100vh" , width:"100vw" , display:"flex" , justifyContent:"center" , alignItems:"center" , backgroundColor:"blue"}}>
      <div>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Loading;
