import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../ContextAPI/MyContext";

const Login = () => {
  const { setNav, setUser, setAdmin, setAllUsers, user } =
    useContext(MyContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    async function getUser() {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getUsers`
      );
      setAllUsers(response.data);
    }

    if (user && user.length !== 0) {
      navigate("/home");
    }
    getUser();
    setNav(false);
  }, []);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signIn/user`,
        { userName, password }
      );
      console.log(response.data, userName, password);

      if (response.data.length === 0 || response.data === "error") {
        setError("Invalid Username or Password");
      } else {
        setUser(response.data);
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your book account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don’t have an account?{" "}
          <Link to="/signUp" className="signup-link-text">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
