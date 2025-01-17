import React, { useContext, useEffect } from "react";
import "./First.css";
import BookComponent from "./BookComponent";
import axios from "axios";
import _ from "lodash";
import { stringify, parse } from "flatted";

import { MyContext } from "../../ContextAPI/MyContext";

const First = () => {
  const { setNav, data, setData, setpagy, setUser } = useContext(MyContext);
  const shuffle = (arr) => {
    for (let i = arr?.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      [arr[random], arr[i]] = [arr[i], arr[random]];
    }
    return arr;
  };

  useEffect(() => {
    setpagy(true);
    setNav(true);
    const hasShuffled = localStorage.getItem("hasShuffled");
    if (!hasShuffled) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}`, { withCredentials: true })
        .then((res) => {
          setData(res.data.book[0]);
          let localbooks = shuffle(res.data.book[0]);
          localStorage.setItem("hasShuffled", "true"); // Set flag in local storage
          localStorage.setItem("books", JSON.stringify(localbooks));
        })
        .catch((err) => console.log(err));
    } else {
      let booksData = JSON.parse(localStorage.getItem("books"));
      booksData && setData(booksData);
    }
  }, [setData, setNav, setUser, setpagy]);

  const handleInput = _.debounce(async (e) => {
    let inputValue = e.target.value;
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/`,
        {
          input: inputValue,
        },
        { withCredentials: true }
      );
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, 500);
  return (
    <div className="first">
      <h2>
        Embark on a literary journey across the globe! Explore a world of
        knowledge, imagination, and stories waiting to be discovered. Use the
        search bar below to delve into an extensive collection of books from
        every corner of the world.{" "}
      </h2>
      <div className="main">
        <input
          type="text"
          placeholder="Enter a book name..."
          name="input"
          onInput={handleInput}
        />
      </div>
      <BookComponent data={data} />
    </div>
  );
};

export default First;
