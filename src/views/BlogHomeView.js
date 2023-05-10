import React from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { useAuthentication } from "../context/authenticationReducer";
import LoginModal from "../components/LoginModal";

function BlogHomeView() {
  const {
    state: { openLoginModal },
  } = useAuthentication();

  return (
    <div className="home min-h-screen" style={{ backgroundColor: "#35858B" }}>
      <Header />
      {openLoginModal && <LoginModal />}
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
