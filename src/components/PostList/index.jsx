import React, { useState } from "react";
import BlogPostCard from "../BlogPostCard";

function PostList() {
  const [postList, setPostList] = useState([
    {
      id: 1,
      title: "Test post",
      author: "Juanferax",
      date: "12/03/2023",
    },
    {
      id: 2,
      title: "Test post",
      author: "Juanferax",
      date: "12/03/2023",
    },
    {
      id: 3,
      title: "Test post",
      author: "Juanferax",
      date: "12/03/2023",
    },
    {
      id: 4,
      title: "Test post",
      author: "Juanferax",
      date: "12/03/2023",
    },
  ]);

  return (
    <div className="px-52">
      <p className="text-left text-xl pb-3">Latest posts:</p>
      <div className="grid grid-cols-3 gap-4 w-full">
        {postList.map((post, idx) => {
          return <BlogPostCard key={idx} post={post} />;
        })}
      </div>
    </div>
  );
}

export default PostList;
