import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../api/API";

const Post = (props) => {

  const { posts, token } = props;
  console.log({posts, myToken:token});
  const { postId } = useParams();
  console.log({postId})
  const post = posts.find((post) => postId === post._id);
  const [content, setContent] = useState("");

  const handleMessage = async (event) => {
    const API_URL = `/posts/${postId}/messages`;
    event.preventDefault();
    try {
      await API({
        url: API_URL,
        method: "post",
        token: token,
        body: {
          message: {
            content: content,
          },
        },
      });
      console.log("DONE!");
    } catch (error) {
      console.error("Error sending a message");
    }
  };
  return (
    <div id="single-post">
      {post ? (
        <div className="post-single-container">
          <h3 className="post-single-title">{post.title}</h3>
          <button>Message Seller</button>
          <p id="seller">Seller: {post.author.username}</p>
          <p className="location">Location: {post.location}</p>
          <p className="description">Price: {post.price}</p>
          <p>Delivers: {post.willDeliver ? "Yes" : "No"}</p>
          <Link className="edit-p" to="/posts/{post._id}/edit">Edit This Post</Link>
        </div>
      ) : (
        ""
      )}
      <form id="message-form" onSubmit={handleMessage}>
        <input type="text" placeholder="Type your message..." onChange={(event) => {setContent(event.target.value);
          }}
          value={content}
        ></input>
        <button onClick={handleMessage}>Send Message</button>
      </form>
    </div>
  );
};

export default Post;
