import React from 'react';
export const COHORT_NAME = "2202-ftb-et-web-pt";
export const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


//     const headers = () => {
//         console.log(localStorage.getItem('token'));
//         let header = {
//          'Content-Type': 'application/json',
//          'Authorization': `Bearer ${localStorage.getItem('token')}`
//          } 
//          return header;
//  }
export const API = async (props) => {
 const { url, method, token, body } = props;
  console.log( { url, method, token, body });
  try {
    const Obj = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log(Obj); 
    // Authorization is included in header only when token is present
    if (token) {
      //create authorization key for token
      Obj.headers["Authorization"] = `Bearer ${token}`;
    }
    // console.log("Call API Request URL: ", API_URL + url);
    console.log("Call API Options: ", Obj);
    const response = await fetch(API_URL + url, Obj);
    console.log(response);
    const data = await response.json();
    console.log({data});
    // Will show data: promised result if method type success
    if (data.error) throw data.error;
    return data;
  } catch (error) {
    console.error("ERROR: ", error);
  }
};