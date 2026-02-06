import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../user/nav/Nav";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../ContextAPI/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

import "./Home.css";
const Home = () => {
  const navigate = useNavigate();
  const { nav, lightTheme, setLightTheme, setUser, user } =
    useContext(MyContext);
  const [light, setLight] = useState(true);
  const [loading, setLoading] = useState(true);
  const temp = "isLight";
  const location = useLocation();
  const handleClick = () => {
    if (light) {
      setLight(false);
      setLightTheme("isDark");
    } else {
      setLight(true);
      setLightTheme(temp);
    }
  };

  useEffect(() => {
    try {
      async function fetchUser() {
        setLoading(true);
        let result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/signIn/user`,
          { withCredentials: true },
        );
        console.log(result.data);

        if (result.data?.LoggedIn) {
          setUser(result.data?.user);
        } else {
          navigate("/");
        }
      }
      fetchUser();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      console.log(user);
    }
  }, [setUser]);

  return (
    <div className={`${lightTheme}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {user && nav && <Nav className="nav" />}
          <div>
            <Outlet />
            {location.pathname !== "/" && (
              <div className="iconContainer">
                {light ? (
                  <FontAwesomeIcon
                    icon={faMoon}
                    className="icon"
                    onClick={handleClick}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="icon"
                    onClick={handleClick}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
