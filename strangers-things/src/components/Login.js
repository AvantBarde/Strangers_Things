import React, { useState } from "react";
import { useHistory } from "react-router-dom";


 const COHORT_NAME = "2202-ftb-et-web-pt";
 const USER_LOGIN = '/users/login';
 const APIURL_LOGIN = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}${USER_LOGIN}`;

// const [isLoggedIn, setIsLoggedIn] = useState(false);


const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  
  const handleSubmit = async (event) => {
    // console.log(APIURL + USER_LOGIN);
    event.preventDefault();
    await fetch(`${APIURL_LOGIN}`, {
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
      setUser("");
      setPass("");
    })
    // const token = localStorage.getItem('token')
    // console.log(token);
    setUser("");
    setPass("");
    history.push("/profile");
  };
  return (
      <form id="login" onSubmit={handleSubmit}>
        {/* console.log(localStorage.getItem('token')) */}
        <label>Username</label>
        <input type="text" value={user} placeholder="Enter Username" onChange={
          (event) => setUser(event.target.value)}></input>
        <label>Password</label>
        <input type="text" value={pass} placeholder="Enter Password" onChange={
          (event) => setPass(event.target.value)}></input>
        <button type="submit">Login</button>
      </form>
  );
};

export default Login;
