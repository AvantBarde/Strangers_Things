import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Auth from "./components/Auth";
import  Posts  from "./components/Posts";
  import  Post  from "./components/Post";
  import  NewPosts  from "./components/NewPosts";
 import  NavigationBar  from "./components/NavigationBar";
 import  Home  from "./components/Home";

import { API } from "./api/API";
import "../src/style.scss";

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchUserData = async (token) => {
    const { data } = await API({
      url: "/users/me",
      token,
    });
    setUserData(data);
    console.log(userData);
    return data;
  };

  const fetchPosts = async () => {
    const { data: { posts },
 } = await API({
      url: "/posts",
    });
    return posts;
  };

  useEffect( () => {
    // const posts = await fetchPosts();
    // setPosts(posts);
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = fetchUserData(token);
    // console.log(data);
    //if there is data and data exists,
    //  setUserData to data to be passed as a prop
    if (data && data.username) {
      setUserData(data);
    }
    // Render every time token is updated 
  }, [token]);

  useEffect( async () => {
    const posts =  await fetchPosts();
    setPosts(posts);
  }, []);

  return (
    <>
      <div id="header">
        {userData.username && (
          <p>Welcome back to Stranger's Things, {userData.username}</p>
        )}
        {!userData.username && <p>Welcome to Stranger's Things</p>}
      </div>
      <NavigationBar token={token} userData={userData} />

      <Switch>
        <Route exact path="/"></Route>

        <Route exact path="/posts">
          <Posts posts={posts} token={token} setPosts={setPosts} userData={userData}/>
        </Route>
        <Route path="/profile">
          <Home userData={userData} token={token} />
        </Route>
        <Route path="/posts/new">
          <NewPosts token={token} userData = {userData} setPosts={setPosts} posts={posts} action="add" />
        </Route>
        {/* Use useParams to dynamically set value of postId */}
        <Route path="/posts/:postId/edit">
          <NewPosts token={token} setPosts={setPosts} posts={posts} userData={userData} action="edit" />
        </Route>
        {/* Using :postId in my use Params to access dynamic route value  */}
        <Route path="/posts/:postId">
          <Post posts={posts} token={token} />
        </Route>
        <Route path="/register">
          <Auth method="register" setToken={setToken} setUserData={setUserData}
          />
        </Route>
        <Route path="/login">
          <Auth method ="login" setToken={setToken} setUserData={setUserData}
          />
        </Route>
      </Switch>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);