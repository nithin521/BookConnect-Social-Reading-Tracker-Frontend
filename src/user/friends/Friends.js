import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../ContextAPI/MyContext";
import "./Friend.css";
import _ from "lodash";
import axios from "axios";

const Friends = () => {
  const [input, setInput] = useState("");
  const { allUsers, setAllUsers, user } = useContext(MyContext);
  const [toggleButton, setToggleButton] = useState({});

  useEffect(() => {
    const initialToggleButtonState = {};
    console.log(allUsers, allUsers?.tempFriends?.length);
    allUsers?.usersOnSearch?.forEach((ele) => {
      const isFollowed =
        allUsers.tempFriends.length !== undefined &&
        allUsers?.tempFriends?.some((e) => e.receiver_id === ele.userId);
      initialToggleButtonState[ele.userId] = isFollowed;
    });
    setToggleButton(initialToggleButtonState);
  }, [allUsers]);

  const handleChange = async (e) => {
    setInput(e.target.value);
    e.target.value && getCorrectUsers(e.target.value);
  };
  async function getCorrectUsers(input) {
    let response = await axios.get(
      //${process.env.REACT_APP_BACKEND_URL}/getUsers//14
      `${process.env.REACT_APP_BACKEND_URL}/getUsers/${input}/${user?.[0]?.userId}`
    );
    setAllUsers(response.data);
  }

  const handleClick = async (e) => {
    let receiverId = e.target.id;

    const isToggleButtonActive = toggleButton[receiverId];
    setToggleButton((prev) => ({
      ...prev,
      [receiverId]: !isToggleButtonActive,
    }));

    if (!isToggleButtonActive) {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendRequest`, {
          user: user?.[0].userId,
          receiverId,
        });
        await getCorrectUsers(input);
      } catch (err) {
        console.log(err);
      }
    } else {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${user?.[0].userId}/${receiverId}`
      );
    }
  };
  return (
    <div className="friends">
      <input type="text" placeholder="Enter a name" onChange={handleChange} />
      {input ? (
        <div>
          {allUsers?.usersOnSearch?.length ? (
            allUsers?.usersOnSearch?.map((ele) => {
              if (ele.username !== user?.[0]?.username) {
                return (
                  <div className="userContainer" key={ele.userId}>
                    <img
                      src={ele.profile_pic}
                      height="45px"
                      width="80px"
                      alt="account"
                      loading="lazy"
                    />
                    <div className="userDetails">
                      <h3>{ele.username}</h3>
                    </div>
                    {!toggleButton[ele.userId] ? (
                      <button
                        className="button btn"
                        onClick={handleClick}
                        id={ele.userId}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className="button btn"
                        onClick={handleClick}
                        id={ele.userId}
                        disabled
                      >
                        UnFollow
                      </button>
                    )}
                  </div>
                );
              }
            })
          ) : (
            <h1>No users Found</h1>
          )}
        </div>
      ) : (
        <h1>Search for a User</h1>
      )}
    </div>
  );
};

export default Friends;
