import React, { useState } from 'react';
const TestArray = ["omar" , 'mohamed' , 'osama', 'lamis' , "fady" , "3mad" , "easy"]
const SearchResults = ({Search}) => {
  const filtered = TestArray.filter((item) => {
    return (
      item.includes(Search) ||
      item.includes(Search) ||
      item.includes(Search)
    )
  })
  console.log(filtered)
  return (
    <div style={{position:"absolute" , top:"-60px" , left:"0" , width:"100%" }}>
      <ul style={{width:"100%", margin:"100px 0 0 0"}}>
        {filtered.map((item , index) => {
          return(
             <div key={index} style={{ backgroundColor:"white" , color:"black" , borderBottom:"1px solid black" }}>
              <h1>{item}</h1>
           </div>
          )
        })}
      </ul>
    </div>
  );
}

export default SearchResults;
