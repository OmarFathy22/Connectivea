import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router";
const SearchResults = ({ Search }) => {
  const [value, loading, error] = useCollection(collection(db, "AllUsers"));
  if (error) console.log(error);
  if (loading) console.log("loading");
  const AllUsers = value?.docs;
  const filtered = AllUsers?.filter((item) => {
    return item.data().name.toLowerCase().includes(Search);
  }).map((item) => item.data());
  const CurMode = localStorage.getItem("currentMode");
  const navigate = useNavigate();
  return (
    <div
      style={{ position: "absolute", top: "-60px", left: "0", width: "100%" }}
    >
      <ul style={{ width: "100%", margin: "100px 0 0 0" }}>
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
      </ul>
    </div>
  );
};

export default SearchResults;
