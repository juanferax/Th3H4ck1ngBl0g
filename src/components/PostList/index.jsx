import React, { useState } from "react";
import BlogPost from "../BlogPost";

function PostList() {
  const [postList, setPostList] = useState([
    {
      title: "Test blog",
    },
    {
      title: "Test blog",
    },
    {
      title: "Test blog",
    },
    {
      title: "Test blog",
    },
  ]);

  return (
    <div className="px-5">
      <p className="text-left text-xl pb-3">Latest posts:</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        {postList.map((post, idx) => {
          return <BlogPost key={idx} post={post} />;
        })}
      </div>
    </div>
  );
}

export default PostList;
