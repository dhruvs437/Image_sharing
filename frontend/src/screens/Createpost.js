import React, { useState, useEffect } from "react";
import "../css/Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";


export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState("piyush");
  const [user,setUser] = useState({});
  const [url, setUrl] = useState("");
  
  const navigate=useNavigate()

  const getUserData = ()=>{
    const u= JSON.parse(localStorage.getItem("user"));
    setUser(u);
    
  }
  //Toast function to get the pop of msg
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(()=>{
    // getting user data 
    getUserData();
  },[])
  //posting image to cloudinary
  useEffect(() => { 
    


    //saving data to mongodb
    if (url) {
      fetch(`${API_URL}/createPost`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {if(data.error){
          notifyA(data.error)
        }
      else{
        notifyB("Successfully Posted")
        navigate("/")
      }})
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "social-clone");
    data.append("cloud_name", "sdhruv");
    fetch("https://api.cloudinary.com/v1_1/sdhruv/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  // console.log("user",u);
    // console.log("userData:,",userData);
    // console.log("userDataNew:,",user);
  return (
    <div className="createPost">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}> create new post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>
      {/* image previes */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src={user.Photo}
              alt=""
            />
          </div>
          <h5>{user.name}</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write a caption..."
        ></textarea>
      </div>
    </div>
  );
}
