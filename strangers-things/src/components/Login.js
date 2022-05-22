import React, { useState } from "react";
import { useHistory } from "react-router-dom";


 const COHORT_NAME = "2202-ftb-et-web-pt";
 const APIURL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// const [isLoggedIn, setIsLoggedIn] = useState(false);

const USER_LOGIN = '/users/login';

const Login = () => {
  const history = useHistory();
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  
  const handleSubmit = async (event) => {
    // console.log(APIURL + USER_LOGIN);
    event.preventDefault();
    await fetch(`${APIURL + USER_LOGIN}`, {
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
