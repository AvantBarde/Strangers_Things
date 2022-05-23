import React, { useState } from "react";
import { useHistory, Fragment } from "react-router-dom";
import { API } from "../api/API";

const cruD = "DELETE";

const postMatches = (mypost, searched) => {
  
  //lowercase search term key works
  const searchTermLower = searched.toLowerCase();
  // console.log("SEARCH: ",searchTermLower);
  const { description, location, title, author: { username }} = mypost;
  // console.log({description, location, title, username})
  

  const toMatch = [description, location, title, username];
  for (let i = 0; i < toMatch.length; i++) {
    const field = toMatch[i];
    // console.log(field)
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Posts = (props) => {
  console.log(props);
  const { posts, token, setPosts, userData } = props;

  
  console.log({token});
  const history = useHistory();
  const [searched, setSearchTerm] = useState("");

  const displayingPosts = posts.filter((mypost) => postMatches(mypost, searched));
  // console.log(displayingPosts)

  // const cohort ='2202-ftb-et-web-pt';
  // const APIURL = `https://strangers-things.herokuapp.com/api/${cohort}/posts`;

  const handleSubmit = async (postId, e) => {
    // './posts/mypost._id'
    const API_URL = `/posts/${postId}`;
    // e.preventDefault();
    try {
      //API with key value pairs including token value for Bearer token
      await API({ url: API_URL, method: cruD, token: token,
      });
      //filter the posts 
      const remainingPosts = posts.filter((mypost) => mypost._id !== postId);
      // setting remainingPosts to posts that don't match my most id'
      setPosts(remainingPosts);
      console.log(posts)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="posts-nav">
        <h2 className="page-title">Posts</h2>
        <input type="text" placeholder="Search Posts" value={searched} onChange={(event) => {
            setSearchTerm(event.target.value);
          }} ></input>
      </div>
      {displayingPosts || displayingPosts.length ? (
        displayingPosts.map((mypost) => (
          
          <div className="mypost-info" key={mypost._id} style={{ border: "2px solid black" }}>
            <div id="title-button">
              <span className="mypost-title">{mypost.title}</span>
              {localStorage.token ? 
              <button onClick={
                () => history.push(`/posts/${mypost._id}`)}> Tell me more!</button>
              :
              <p>Please Log in to see more!</p>
              }
            </div>
            <div id="seller">Seller: {mypost.author.username}</div>
            <div className="location">Location: {mypost.location}</div>
            <div className="description">Description: {mypost.description}</div>

            {mypost.author.username === userData.username ? (
              <button onClick={() => handleSubmit(mypost._id)}>
                Delete Post
              </button>
            ) : null}
          </div>
        ))
      ) : (
        <div>
          <h1>There are no matching posts...</h1>
        </div>
      )}
    </>
  );
};

export default Posts;