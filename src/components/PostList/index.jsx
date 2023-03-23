import React, { useState } from "react";
import PostCard from "../PostCard";
import { usePosts } from "../../context/postsReducer";

function PostList() {
  const {
    state: { posts },
  } = usePosts();

  return (
    <div className="px-52 pb-10">
      <p className="text-left text-xl pb-3">Latest posts:</p>
      <div className="grid grid-cols-3 gap-4 w-full">
        {posts.map((post, idx) => {
          return <PostCard key={idx} post={post} />;
        })}
      </div>
    </div>
  );
}

export default PostList;
