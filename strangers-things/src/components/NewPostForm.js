import React, { useState } from "react";
import { callApi } from "../api";
import { useHistory, useParams } from "react-router-dom";

const NewPostForm = ({ token, setPosts, posts, action }) => {
  const history = useHistory();
  const { postId } = useParams();
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  });
  const isEdit = action === "edit";
  const title = isEdit ? "Edit This Post" : "Add a New Post";
  const method = isEdit ? "PATCH" : "POST";
  const API_URL = isEdit ? `/posts/${postId}` : `/posts`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { post },
      } = await callApi({
        url: API_URL,
        method: method,
        body: {
          post: {
            title: newPost.title,
            description: newPost.description,
            price: newPost.price,
            location: newPost.location,
            willDeliver: newPost.willDeliver,
          },
        },
        token,
      });

      if (isEdit) {
        //grab existing posts other than the one I'm editing
        // add in the post i've edited
        const filteredPosts = posts.filter((post) => post._id !== postId);
        setPosts([...filteredPosts, post]);
      } else {
        //otherwise i am creating a new post, so take my old posts and add this new one to the bottom
        setPosts([...posts, post]);
      }
      //no matter what send users to the /posts page when we are done
      history.push("/posts");
    } catch (error) {
      console.error("Error adding your post:", error);
    }
  };

  const handlePostFieldChange = (property) => (event) => {
    if (property === "willDeliver") {
      setNewPost({ ...newPost, [property]: event.target.checked });
    } else {
      setNewPost({ ...newPost, [property]: event.target.value });
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <form id="new-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What are you selling?"
          onChange={handlePostFieldChange("title")}
          value={newPost.title}
        ></input>
        <input
          type="text"
          placeholder="Describe the item (i.e. condition, model)"
          onChange={handlePostFieldChange("description")}
          value={newPost.description}
        ></input>
        <input
          type="number"
          placeholder="What's the price?"
          onChange={handlePostFieldChange("price")}
          value={newPost.price}
        ></input>
        <input
          type="text"
          placeholder="Where is the item located?"
          onChange={handlePostFieldChange("location")}
          value={newPost.location}
        ></input>
        <label>
          Are you willing to deliver?
          <input
            type="checkbox"
            onChange={handlePostFieldChange("willDeliver")}
            value={newPost.willDeliver}
          ></input>
        </label>

        <button>{title}</button>
      </form>
    </>
  );
};

export default NewPostForm;
