import "./message.css";
// import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="http://surl.li/rkbmr"
        />
        <p className="messageText">
          {/* {message.text} */}
          hii  iam  here
          </p>
      </div>
      <div className="messageBottom">
      {/* {format(message.createdAt)} */}
        1 hour ago</div>
    </div>
  );
}
