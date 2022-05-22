import React, { useState, useEffect } from "react";
import { callApi } from "../api/API";

const Home = (props) => {
  const { userData, token } = props
  // const API_URL = `/users/me`;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(userData.posts);
  }, [userData]);

  const handleSubmit = async (postId) => {
    const API_URL = `/posts/${postId}`;
    try {
      await callApi({
        url: API_URL,
        method: "delete",
        token: token,
      });
      const remainingPosts = posts.filter((post) => post._id !== postId);
      setPosts(remainingPosts);
    } catch (error) {
      console.error(error);
    }
  };


  // console.log("DATA", userData);
  // console.log("POSTS", userData.posts);
  // console.log("UserData:", userData);

  return (
    <div>
      <h1 className="page-title">
        Welcome to Strangers Things, {userData.username}
      </h1>
      <div className="profile-body">
        {userData.messages && userData.messages.length ? (
          <div>
            <div id="inbox-container">
              <h3 id="inbox">Inbox ({userData.messages.length})</h3>
              {userData.messages.map((message) => {
                return (
                  <div id="message" key={message._id}>
                    <label id="sender">{message.fromUser.username}</label>
                    <p id="message-content">{message.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h2>You have no more messages</h2>
        )}
        {posts && posts.length ? (
          <div id="user-posts">
            <h2>Past Posts You've Created</h2>
            {posts.map((post) => {
              return (
                <div key={post._id} style={{ border: "1px solid black" }}>
                  <h5>{post.title}</h5>
                  <div>Posted by: {userData.username}</div>
                  <div>Description: {post.description}</div>
                  <div>Location: {post.location}</div>
                  <button onClick={() => handleSubmit(post._id)}>
                    Delete Post
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <h2>You haven't created any posts yet.</h2>
        )}
      </div>
    </div>
  );
};

export default Home;