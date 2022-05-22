import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//  const BASE_URL = "https://strangers-things.herokuapp.com/api/";

//  const COHORT_NAME = "2202-ftb-et-web-pt";
//  const API_URL = `BASE_URLCOHORT_NAME`;

const BASE_URL =
"https://strangers-things.herokuapp.com/api/2202-ftb-et-web-pt";
// const [isLoggedIn, setIsLoggedIn] = useState(false);

const USER_LOGIN = '/users/login';

const Login = () => {
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const history = useHistory();
  
  const handleSubmit = async (event) => {
    // console.log(BASE_URL + USER_LOGIN);
    event.preventDefault();
    await fetch(`${BASE_URL + USER_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user,
          password: pass,
        }
      })
    }).then(response => response.json())
    .then(result => {
      const data = result;
      // console.log(data.data.token);
      const token = data.data.token;
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
    })
    // const token = localStorage.getItem('token')
    // console.log(token);
    setUsername("");
    setPassword("");
    history.push("/profile");
  };
  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" value={user} placeholder="Enter Username" onChange={
          (event) => setUsername(event.target.value)}></input>
        <label>Password</label>
        <input type="text" value={pass} placeholder="Enter Password" onChange={
          (event) => setPassword(event.target.value)}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
