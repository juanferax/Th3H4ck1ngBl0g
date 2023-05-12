import React, { useContext, useEffect, useState } from "react";
import PostCard from "../PostCard";
import { usePosts } from "../../context/postsReducer";
import AddPostModal from "../AddPostModal";
import EditPostModal from "../EditPostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AuthenticationContext from "../../context/AuthenticationContext";

function PostList() {
  const {
    state: { posts, selectedPost },
  } = usePosts();

  const { loggedIn } = useContext(AuthenticationContext);

  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpened(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpened(false);
  };

  return (
    <div className="px-52 pb-10">
      {loggedIn && (
        <>
          {!isAddModalOpened ? (
            <button
              className="border rounded-md py-1 px-2 text-white"
              style={{ backgroundColor: "#072227" }}
              onClick={handleOpenAddModal}
            >
              Add new entry <FontAwesomeIcon icon={faPlus} />
            </button>
          ) : (
            <button
              className="border rounded-md py-1 px-2 text-white"
              style={{ backgroundColor: "#072227" }}
              onClick={handleCloseAddModal}
            >
              Cancel <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </>
      )}
      {isAddModalOpened && (
        <AddPostModal handleCloseAddModal={handleCloseAddModal} />
      )}
      {selectedPost && <EditPostModal />}
      <p className="text-left text-xl pt-5 pb-3 font-semibold">
        {loggedIn ? "My posts:" : "Latest posts:"}
      </p>
      <div className="grid grid-cols-3 gap-4 w-full">
        {posts.map((post, idx) => {
          return <PostCard key={idx} post={post} />;
        })}
      </div>
    </div>
  );
}

export default PostList;
