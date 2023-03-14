import React from "react";

function BlogPost({ post }) {
  return <div className="border border-black rounded-md"> {post.title} </div>;
}

export default BlogPost;
