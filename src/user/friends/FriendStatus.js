import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FriendStatus.css";
import axios from "axios";
import FriendsBooksComponent from "./FriendsBooksComponent";

const FriendStatus = () => {
  const { state } = useLocation();
  let user = state;
  const [usertables, setUserTables] = useState({
    completed: [],
    to_read: [],
    reading: [],
    favorites: [],
  });
  useEffect(() => {
    let tables = ["completed", "to_read", "reading", "favorites"];
    async function getuserTables() {
      let newData = [];
      for (let i = 0; i < 4; i++) {
        let data = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getFriendsLibrary/${tables[i]}/${user.userId}`
        );
        newData[tables[i]] = data.data;
        setUserTables(newData);
      }
    }
    getuserTables();
  }, [user]);
  return (
    <div className="friendStatus">
      <div className="userDetails">
        <img src={user.profile_pic} height="45px" width="80px" alt="account" />
        <div className="userDetails">
          <h2>{user.username}</h2>
        </div>
      </div>
      <FriendsBooksComponent
        className="completedBooks"
        usertables={usertables?.completed}
        title="Completed"
      />
      <FriendsBooksComponent
        className="favorites"
        usertables={usertables?.favorites}
        title="Favorites"
      />
      <FriendsBooksComponent
        className="to_read"
        usertables={usertables?.to_read}
        title="To Read"
      />
      <FriendsBooksComponent
        className="reading"
        usertables={usertables?.reading}
        title="Reading"
      />
    </div>
  );
};

export default FriendStatus;
