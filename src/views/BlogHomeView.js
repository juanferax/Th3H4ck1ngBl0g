import React from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";

function BlogHomeView() {
  return (
    <div className="home">
      <Header />
      <p className="py-5 text-center" style={{ fontSize: 50 }}>
        Th3 H4ck1ng Bl0g
      </p>
      <PostList />
    </div>
  );
}

export default BlogHomeView;
