import React, { useContext, useState } from "react";
import "./History.css";
import LibraryComponent from "./LibraryComponent";
import { MyContext } from "../../ContextAPI/MyContext";

const History = () => {
  const [value, setValue] = useState("favorites");
  const [active, setActive] = useState("favorites");
  const { lightTheme } = useContext(MyContext);
  console.log(lightTheme === "isDark");
  return (
    <div className={lightTheme === "isDark" ? "history dark" : "history"}>
      <div className="left">
        <h3
          onClick={() => {
            setValue("favorites");
            setActive("favorite");
          }}
          className={active === "favorite" ? "active" : ""}
        >
          Favorites
        </h3>
        <h3
          onClick={() => {
            setValue("to_read");
            setActive("to_read");
          }}
          className={active === "to_read" ? "active" : ""}
        >
          To Read
        </h3>
        <h3
          onClick={() => {
            setValue("reading");
            setActive("reading");
          }}
          className={active === "reading" ? "active" : ""}
        >
          Reading
        </h3>
        <h3
          onClick={() => {
            setValue("completed");
            setActive("completed");
          }}
          className={active === "completed" ? "active" : ""}
        >
          Completed
        </h3>
      </div>
      <div className="right">{<LibraryComponent val={value} />}</div>
    </div>
  );
};

export default History;
