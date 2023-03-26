import React, { useContext, useState } from "react";
import PostCard from "../PostCard";
import { usePosts } from "../../context/postsReducer";
import AddPostModal from "../AddPostModal";
import EditPostModal from "../EditPostModal";
import { useAuthentication } from "../../context/authenticationReducer";

function PostList() {
  // Color palette
  // https://colorhunt.co/palette/07222735858b4fbdbaaefeff

  // Other options
  // https://colorhunt.co/palette/371b584c35755b4b8a7858a6
  // https://colorhunt.co/palette/2e0249570a57a91079f806cc
  // https://colorhunt.co/palette/1a1a402700827a0bc0fa58b6
  // https://colorhunt.co/palette/0000003e065f700b978e05c2
  // https://colorhunt.co/palette/22577e5584ac95d1ccf6f2d4
  // https://colorhunt.co/palette/2121213232320d737714ffec

  const {
    state: { posts, selectedPost },
  } = usePosts();

  const {
    state: { loggedIn },
  } = useAuthentication();

  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpened(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpened(false);
  };

  // const handleShowAddModal = () => {
  //   if (isAddModalOpened) {
  //     return <AddPostModal handleCloseAddModal={handleCloseAddModal} />;
  //   }
  //   return;
  // };

  return (
    <div className="px-52 pb-10">
      {loggedIn && (
        <>
          {!isAddModalOpened ? (
            <button
              className="border rounded-md p-1 text-white"
              style={{ backgroundColor: "#072227" }}
              onClick={handleOpenAddModal}
            >
              Add new entry +
            </button>
          ) : (
            <button
              className="border rounded-md p-1 text-white"
              style={{ backgroundColor: "#072227" }}
              onClick={handleCloseAddModal}
            >
              Cancel X
            </button>
          )}
        </>
      )}
      {isAddModalOpened && (
        <AddPostModal handleCloseAddModal={handleCloseAddModal} />
      )}
      {selectedPost && <EditPostModal />}
      <p className="text-left text-xl py-3">Latest posts:</p>
      <div className="grid grid-cols-3 gap-4 w-full">
        {posts.map((post, idx) => {
          return <PostCard key={idx} post={post} />;
        })}
      </div>
    </div>
  );
}

export default PostList;
