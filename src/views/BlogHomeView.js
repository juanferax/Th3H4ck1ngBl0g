import React from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";

function BlogHomeView() {
  return (
    <div className="home">
      <Header />
      <h1 className="py-5 text-center" style={{ fontSize: 50 }}>
        Th3 H4ck1ng Bl0g
      </h1>
      <PostList />
    </div>
  );
}

export default BlogHomeView;
