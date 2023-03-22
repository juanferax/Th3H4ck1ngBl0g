import React, { useState } from "react";
import PostCard from "../PostCard";

function PostList() {
  const [postList, setPostList] = useState([]);

  return (
    <div className="px-52 pb-10">
      <p className="text-left text-xl pb-3">Latest posts:</p>
      <div className="grid grid-cols-3 gap-4 w-full">
        {postList.map((post, idx) => {
          return <PostCard key={idx} post={post} />;
        })}
      </div>
    </div>
  );
}

export default PostList;
