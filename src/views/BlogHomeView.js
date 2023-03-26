import React from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";

function BlogHomeView() {
  return (
    <div className="home" style={{ backgroundColor: "#35858B" }}>
      <Header />
      <p
        className="py-5 text-center title"
        style={{ fontSize: 60, color: "#072227" }}
      >
        Th3 H4ck1ng Bl0g
      </p>
      <PostList />
    </div>
  );
}

export default BlogHomeView;
