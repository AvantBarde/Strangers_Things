import React, { useState } from "react";
import { callApi } from "../api/API";
//UseParams dynamically changes the route paramater of a route path
// Recall from here: https://stackoverflow.com/questions/60998386/using-the-useparams-hook-in-react
import { useHistory, useParams } from "react-router-dom";
import { isCompositeComponent } from "react-dom/test-utils";

const NewPosts = (props) => {
  const { token, setPosts, posts, action } = props;
  const history = useHistory();
  const { postId } = useParams();
  console.log({postId})
  
  //storing route parameters in a variable to use to choose which posts I can edit
  const [newPost, setNewPost] = useState({ description: "", price: "", location: "", title: "",  willDeliver: false,
  });
  console.log(newPost);
  // function handleEvent(event, checkedState) {
  //   if (checkedState === "willDeliver") {
  //     setNewPost({ ...newPost, [checkedState]: event.target.checked });
  //   } else {
  //     setNewPost({ ...newPost, [checkedState]: event.target.value });
  //   }
  // }

  //check the state of the new post
  const stateOfNewPosts = (checkedState) => {
    return (event) => {
      
      checkedState === "willDeliver" ? 
      //event.target.checked checks the state of the checkbox
      setNewPost({ ...newPost, 
        //using array destructure to signify the last item in the array is the state
        [checkedState]: event.target.checked })
      :
      setNewPost({ ...newPost, 
        [checkedState]: event.target.value });
      // if (checkedState === "willDeliver") {
      //   //setNewpost to every post PlUS every new post
      //   setNewPost({ ...newPost, [checkedState]: event.target.checked });
      // } else {
      //   setNewPost({ ...newPost, [checkedState]: event.target.value });
      // }

    }
  }

  const editPost = action === "edit";
  const title = (editPost)
   ? 
   ("Edit This Post" )
   : ("Add a New Post")

   
  const method = editPost
  //Decides whether the method used in the API body should add or edit the post
  ? "PATCH" 
  : "POST";
  const API_URL = editPost ? `/posts/${postId}` : `/posts`;



  // const stateOfNewPosts = (property) => (event) => {
  // };

  return (
    <>
      <h2>{title}</h2>
      <form id="new-post-form" onSubmit={async (e) => {
    e.preventDefault();
    try {
              // const cohort ='2202-ftb-et-web-pt';
        // const APIURL = `https://strangers-things.herokuapp.com/api/${cohort}/posts`;
        // fetch(APIURL, {
        //     method: "POST",
        //     headers: {
        //         'Authorization' = `Bearer ${token}`
        //         'Content-Type': 'application/json',
        //         
        //     },
        //      
        //     body: JSON.stringify({
        //         post: {
        //          title: newPost.title,
        //          description: newPost.description,
        //          price: newPost.price,
        //          location: newPost.location,
        //          willDeliver: newPost.willDeliver,
        //         }
        //     })
        // }).then(response => response.json())
        // .then(result => {
        //     console.log(result);
        // })
        // .catch(console.error);
        
      const {
        data: { post },
      } = await callApi({
        //`/posts/${postId}` or `/posts`
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
      if (editPost) {
        //includes the posts im editing with the current posts
        const filteredPosts = posts.filter((post) => post._id !== postId);
        // all the posts plus the current posts
        setPosts([...filteredPosts, post]);
        console.log(filteredPosts)
      } else {
        //take all my posts and, include the new posts 
        setPosts([...posts, post]);
      }
      //go the ./posts after
      history.push("/posts");
    } catch (error) {
      console.error("Error:", error);
    }
  }}>
        <input className = 'seller-input' type="text" placeholder="What do you want to sell?" onChange={stateOfNewPosts("title")} value={newPost.title}></input>
        <input type="text" placeholder="Describe the item"  onChange={stateOfNewPosts("description")} value={newPost.description}></input>
        <input type="text" placeholder="Where is the item located?" onChange={stateOfNewPosts("location")} value={newPost.location}></input>
        <input type="number" placeholder="Name the price?" onChange={stateOfNewPosts("price")} value={newPost.price} ></input>
        <label>
          Will you deliver?
          <input
            type="checkbox"
            onChange={stateOfNewPosts("willDeliver")}
            value={newPost.willDeliver}
          ></input>
        </label>

        <button>{title}</button>
      </form>
    </>
  );
};

export default NewPosts;
