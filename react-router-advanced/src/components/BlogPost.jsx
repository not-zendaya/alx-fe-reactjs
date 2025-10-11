import React from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Blog Post ID: {id}</h1>
      <p>This is a dynamically loaded blog post. The ID comes from the URL.</p>
    </div>
  );
};

export default BlogPost;
