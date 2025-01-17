import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Genre from "./Genre";
import { MyContext } from "../../ContextAPI/MyContext";

const GenreComponent = () => {
  let { genreid } = useParams();
  const { setData, data } = useContext(MyContext);
  useEffect(() => {
    async function getData() {
      try {
        let response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/genre/${genreid}`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [genreid, setData]);

  return (
    <div>
      {data?.map((ele) => {
        return <Genre ele={ele} key={"ele"} />;
      })}
    </div>
  );
};

export default GenreComponent;
