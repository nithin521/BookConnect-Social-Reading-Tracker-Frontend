import React from "react";

const FriendsBooksComponent = ({ usertables, title, className }) => {
  console.log(usertables);
  return (
    <div className={className}>
      <h2>{title} Books</h2>
      {usertables?.length ? (
        usertables?.map((ele) => {
          return (
            <div className="fbook-box" key={ele.book_id}>
              <div className="innerbox">
                <div>
                  <img src={ele.image_link} alt="books" />
                </div>
              </div>
              <div className="fbook-detail-wrapper">
                <div className="title">
                  <h3 className="link">
                    <strong>{ele.title}</strong>
                  </h3>
                </div>
                <div className="author">
                  <h5>
                    Author : <span>{ele.author}</span>
                  </h5>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h3>No books found !</h3>
      )}
    </div>
  );
};

export default FriendsBooksComponent;
