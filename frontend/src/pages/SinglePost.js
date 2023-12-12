import React, { useState, useEffect } from "react";
import PostDetail from "../components/PostDetail";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

function SinglePost() {
  const [post, setPost] = useState({});
  const { postId } = useParams(); // Access the postId from the URL parameter

  useEffect(() => {
    fetchData();
  }, [postId]); // Fetch data whenever postId changes

  const baseURL = `http://localhost:3001/api/posts/${postId}`;

  // Fetch data based on the postId
  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      console.log("Response for Single Data:", response.data);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Header />
      <PostDetail post={post} />
    </div>
  );
}

export default SinglePost;
