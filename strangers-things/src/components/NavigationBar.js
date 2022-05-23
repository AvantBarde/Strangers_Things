import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const NavigationBar = (props) => {
  const { token, userData } = props
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(userData)
  
  useEffect(() => {
    //If there's a token in localStorage, isLoggedIn is true
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [token]);
  console.log({Loggedin: isLoggedIn})
  return (
      <div id="nav-links"> 
          <Link to="/posts">View Posts from Strangers!</Link>
        <div>
        {isLoggedIn ? (
            <div className="nav-bar">
                <Link to="/posts/new">Add a Post</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/" onClick={() => { localStorage.removeItem("token");  setIsLoggedIn(false);  }} >
                  Logout
                </Link>
            </div>
          ) : (
            <div className = "nav-bar">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>

  );
};

export default NavigationBar;
