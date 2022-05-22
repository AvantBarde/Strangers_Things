import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import { callApi } from "../api/API"; //API import 

const Auth = (props) => {
  // const USERID = `https://strangers-things.herokuapp.com/api/2202-ftb-et-web-pt/users/`;
  // const RegisteredAPI = `${USERID}register`;
  // const loggedin = `${USERID}login`;
  // const API_USER = `${USERID}me`;
  const {method, setToken} = props;
  // console.log({method, setToken});
  const history = useHistory();
  const [ username,  setUsername ] = useState("");
  const [ password,  setPassword ] = useState("");
  
  // Depending on the Route Link I click on, method will inherit that value, 
  console.log({method})
  //Comparing method value to login to give IsLogin Boolean value
  const isLogin = (method ==="login")  
  //if my isLogin is false, then i clicked on './Register'
  const title = (!isLogin) 
  ? "Register" 
  : "Login";


  return (
    <div id="register-fields">
      <h3 className="page-title">{title}</h3>
      <form onSubmit={async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/users/${method}`,
      body: { user: { username, password } },
      method: "POST",
    });
    const token = data.data.token;
    if (token) {
      // console.log(data)
      localStorage.setItem("token", token);
      //Redirect to homepage
      history.push("/");
      setToken(token);
      console.log({password, username, token});
    }
  }}>
        <input type="text" placeholder="Username" value={username} // onClick={ => { }}
        onChange={(event) => setUsername(event.target.value)}></input>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        {/* if i click on '.Login' Link tag, button will be 'sign in' else 'sign up' */}
        <button type="submit">{method === 'login' ? 'Sign In' : 'Sign Up' }</button>
      </form>
    </div>
  );
};

export default Auth;
