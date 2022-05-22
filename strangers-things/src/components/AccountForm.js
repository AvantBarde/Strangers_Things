import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";

const COHROT = `https://strangers-things.herokuapp.com/api/2202-ftb-et-web-pt/users/`;
const RegisteredAPI = `${COHROT}register`;
const loggedin = `${COHROT}login`;
// const API_USER = `${COHROT}me`;

const AccountForm = ({ action, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Is logged in equals when action is set to string "login"
  const isLogin = action === "login";
  
  const title = !isLogin ? "Register" : "Login";
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/users/${action}`,
      body: { user: { username, password } },
      method: "POST",
    });
    const token = data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      setToken(token);
      history.push("/");
    }
  };
  return (
    <div id="register-fields">
      <h4 className="page-title">{title}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AccountForm;
