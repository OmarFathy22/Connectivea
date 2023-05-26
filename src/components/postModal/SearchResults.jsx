/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router";
import * as React from "react";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Loading from '../Loading'
const SearchResults = ({ Search }) => {
  const navigate = useNavigate();
  const [value, loading, error] = useCollection(collection(db, "AllUsers"));
  const [isLoading, setisLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (error) console.log(error);
  const AllUsers = value?.docs;
  const filtered = AllUsers?.filter((item) => {
    return item.data().name.toLowerCase().includes(Search);
  }).map((item) => item.data());
  const CurMode = localStorage.getItem("currentMode");
  setTimeout(() => {
    setisLoading(false);
  }, 700);

  return (
    <div
      style={{ position: "absolute", top: "39.5px", left: "0", width: "100%" }}
    >
      {/* <ul style={{ width: "100%", margin: "100px 0 0 0" , overflow:"auto" , maxHeight:"500px"}}>
        {filtered?.map((item, index) => {
          return (
            <div
             onClick={() => {
              localStorage.setItem(
                "CurrUser",
                JSON.stringify({
                  name: item?.name,
                  picture: item?.picture,
                })
              );
              navigate(`/profile/${item?.uid}`);
             }}
              className="searchItemContainer"
              key={index}
              style={{
                backgroundColor: CurMode === "dark" ? "#222" : "white",
                color: CurMode === "dark" ? "white" : "#222",
                display: "flex",
                gap: "10px",
                padding: "10px 5px",
                cursor: "pointer",
                boxShadow:
                  CurMode === "dark"
                    ? "0px 0px 1px 1px #555"
                    : "0px 0px 1px 1px #999",
                transition: "color 0.3s ease-in-out",
              
              }}
            >
              <img
                src={item?.picture}
                alt="image"
                width={"30px"}
                height={"30px"}
                style={{ borderRadius: "50%" }}
              />
              <h1 style={{ fontSize: "20px" }}>{item?.name}</h1>
            </div>
          );
        })}
      </ul> */}

      {isLoading && (
        <div style={{
          backgroundColor: CurMode === "dark" ? "#222" : "white",
          color: CurMode === "dark" ? "white" : "#222",
          display: "flex",
          padding:"10px 0",
          justifyContent:"center",
          alignItems:"center",
        }}>
          <Loading/>
        </div>
      )}
      {filtered?.length > 0 && !isLoading && (
        <Paper>
          <MenuList>
            {filtered?.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    localStorage.setItem(
                      "CurrUser",
                      JSON.stringify({
                        name: item?.name,
                        picture: item?.picture,
                      })
                    );
                    navigate(`/profile/${item?.uid}`);
                  }}
                  className="searchItemContainer"
                  key={index}
                  style={{
                    // backgroundColor: CurMode === "dark" ? "#222" : "white",
                    color: CurMode === "dark" ? "white" : "#222",
                    display: "flex",
                    gap: "10px",
                    padding: "10px 5px",
                    cursor: "pointer",
                    // boxShadow:
                    //   CurMode === "dark"
                    //     ? "0px 0px 1px 1px #555"
                    //     : "0px 0px 1px 1px #999",
                    // transition: "color 0.3s ease-in-out",
                  }}
                >
                  <img
                    src={item?.picture}
                    alt="image"
                    width={"30px"}
                    height={"30px"}
                    style={{ borderRadius: "50%" }}
                  />
                  <h1 style={{ fontSize: "20px", color: CurMode === "dark" ? "white" : "#222" }}>
                    {item?.name}
                  </h1>
                </div>
              );
            })}
          </MenuList>
        </Paper>
      )}
    </div>
  );
};

export default SearchResults;
