import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import { API_URL } from "../../config/api";
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async (req,res) => {
      try {
        const res = await axios(`${API_URL}/user/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.user?.Photo?user?.user?.Photo:"https://shorturl.at/jxP58"
        }
        alt=""
      />
      <span className="conversationName">{user?.user?.name}</span>
    </div>
  );
}