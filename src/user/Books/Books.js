import React from "react";
import { Link } from "react-router-dom";
import "./Books.css";
const Books = ({ data }) => {
  return (
    data && (
      <div className="box" key={data.book_id}>
        <Link to="/bookdetails" state={data} style={{ textDecoration: "none" }}>
          <div className="left-box">
            <img src={data.image_link} alt="books" loading="lazy" />
          </div>
        </Link>
        <div className="right-box">
          <Link
            to="/bookdetails"
            state={data}
            style={{ textDecoration: "none" }}
          >
            <div className="title">
              <h2 className="link">
                <strong>{data.title}</strong>
              </h2>
            </div>
          </Link>
          <div className="description">
            <h5>{data.book_desc}</h5>
          </div>
          <div className="details-wrapper">
            <h5>Ratings: {data.rating}</h5>
            <h5>No.OfPages : {data.pageCount}</h5>
            <h5>
              Author : <span>{data.author}</span>
            </h5>
          </div>
        </div>
      </div>
    )
  );
};

export default Books;
