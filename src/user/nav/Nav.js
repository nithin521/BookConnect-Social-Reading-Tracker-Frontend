import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Nav.css";
import { Link } from "react-router-dom";
import { MyContext } from "../../ContextAPI/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, setGenres, genre, setUser } = useContext(MyContext);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  // const [requestsCount, setRequestsCount] = useState(0);

  useEffect(() => {
    async function getGenre() {
      let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`);
      let genres = response.data.genre;
      setGenres(genres);
      console.log(user);

      // let requests =
      //   user.length !== 0 &&
      //   (await axios.get(
      //     //${process.env.REACT_APP_BACKEND_URL}/getUsers//14
      //     `${process.env.REACT_APP_BACKEND_URL}/requests/${user?.[0].userId}`,
      //     { withCredentials: true },
      //   ));
      // console.log(requests);

      // let reqCount = 0;
      // for (let i = 0; i < requests.data?.freindsId?.length; i++) {
      //   if (requests.data.freindsId?.[i].status === "pending") reqCount++;
      // }
      // setRequestsCount(reqCount);
    }
    getGenre();
  }, [setGenres, user]);

  const toggleMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  };

  const handleLogOut = async () => {
    try {
      const hasShuffled = localStorage.getItem("hasShuffled");
      hasShuffled && localStorage.removeItem("hasShuffled");
      hasShuffled && localStorage.removeItem("books");

      setUser(null); // Assuming setUser is a function to update the user state
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        withCredentials: true,
      });
      navigate("/");
      console.log(user);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="nav">
      <Link to="/home" className="logoDiv">
        <base href="/"></base>
        <img src="images/logo.jpg" alt="logo" height="60px" />
      </Link>
      <div>
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger"
          onClick={toggleMenu}
        />
      </div>
      <div className={`${!menu ? "menu" : "sm"}`}>
        {/* <div className="genre-container">
          <h3 className=" nav-link">Genres</h3>
          <div className="dropdown">
            {genre?.map((ele) => (
              <Link
                to={`genre/${ele.genre_name}`}
                key={ele.genre_name}
                style={{ textDecoration: "none" }}
              >
                <h4 className="nav-link">{ele.genre_name}</h4>
              </Link>
            ))}
          </div>
        </div> */}
        {/* <Link to="/history" style={{ textDecoration: "none" }}>
          <h3 className="nav-link">My Library</h3>
        </Link> */}
        {/* <Link to="/friends" style={{ textDecoration: "none" }}>
          <h3 className="nav-link">Find Friends</h3>
        </Link>
        <Link to="/requests" style={{ textDecoration: "none" }}>
          <h3 className="nav-link">
            Requests{" "}
            <sup>{requestsCount ? requestsCount : <span>&#x25cf;</span>}</sup>
          </h3>
        </Link> */}
        {/* <Link to="/recent" style={{ textDecoration: "none" }}>
          <h3 className="link">Most Recent</h3>
        </Link> */}
        <div className="imageContainer">
          <img
            src={user?.[0]?.profile_pic}
            height="45px"
            width="80px"
            alt="account"
          />
          <div className="Ldropdown">
            <Link to="/" style={{ textDecoration: "none" }}>
              {/* <Link to="/userFriends" style={{ textDecoration: "none" }}>
                <h3 className="nav-link">Friends</h3>
              </Link> */}
              {/* <Link to="/profile" style={{ textDecoration: "none" }}>
                <h3 className="nav-link">Profile</h3>
              </Link> */}
              <Link to="/history" style={{ textDecoration: "none" }}>
                <h3 className="nav-link">My Library</h3>
              </Link>
              <h3 className="nav-link" onClick={handleLogOut}>
                Logout
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
