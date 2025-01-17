import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../ContextAPI/MyContext";
import "./Completed.css";

const LibraryComponent = ({ val }) => {
  const { user } = useContext(MyContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getCompleted() {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getLibrary/${val}/${user?.[0]?.userId}`
      );
      let result = await response.data;
      console.log(result);
      setData(result);
    }
    getCompleted();
  }, [user, val]);
  return (
    <div>
      {data?.length ? (
        data?.map((ele) => {
          return (
            <div key={ele} className="completed">
              <div className="completed_left">
                <img src={ele.image_link} alt="book" />
                <h3 className="library_author">{ele.author}</h3>
              </div>
              <div className="completed_right">
                <h2 className="book_title">{ele.title}</h2>
                <h3 className="desc">{ele.book_desc}</h3>
                <h3 className="book_created_at">
                  {ele.created_at.slice(0, 10)}
                </h3>
              </div>
            </div>
          );
        })
      ) : (
        <h2>{`There are no books in this ${val
          .replace("_", " ")
          .toUpperCase()} Shelf`}</h2>
      )}
    </div>
  );
};

export default LibraryComponent;
