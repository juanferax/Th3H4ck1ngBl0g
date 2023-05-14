import React, { useContext, useEffect, useState } from "react";
import PostCard from "../PostCard";
import { usePosts } from "../../context/postsReducer";
import AddPostModal from "../AddPostModal";
import EditPostModal from "../EditPostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AuthenticationContext from "../../context/AuthenticationContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

function PostList() {
  const {
    state: { selectedPost },
    dispatch,
  } = usePosts();

  const { loggedIn, user } = useContext(AuthenticationContext);

  const postsCollectionRef = collection(db, "posts");

  const [posts, setPosts] = useState([]);
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpened(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpened(false);
  };

  const getMyPosts = async () => {
    try {
      const q = query(postsCollectionRef, where("author_uid", "==", user.uid));
      getDocs(q).then((querySnapshot) => {
        const formattedData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(formattedData);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getPublicPosts = () => {
    try {
      const q = query(postsCollectionRef, where("public", "==", true));
      getDocs(q).then((querySnapshot) => {
        const formattedData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(formattedData);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && loggedIn) {
      getMyPosts();
    }
  });

  useEffect(() => {
    if (!user && !loggedIn) {
      getPublicPosts();
    }
  }, [loggedIn]);

  // Close AddPostModal when a post is selected for edition
  useEffect(() => {
    if (isAddModalOpened) setIsAddModalOpened(false);
  }, [selectedPost]);

  return (
    <div className="lg:px-48 px-5 pb-10">
      {loggedIn && (
        <>
          {!selectedPost && (
            <>
              {!isAddModalOpened ? (
                <button
                  className="rounded-md py-1 px-2 text-white"
                  style={{ backgroundColor: "#072227" }}
                  onClick={handleOpenAddModal}
                >
                  New entry{" "}
                  <FontAwesomeIcon className="pl-1" icon={faFileCirclePlus} />
                </button>
              ) : (
                <button
                  className="rounded-md py-1 px-2 text-white bg-red-700"
                  // style={{ backgroundColor: "#072227" }}
                  onClick={handleCloseAddModal}
                >
                  Cancel <FontAwesomeIcon className="pl-1" icon={faXmark} />
                </button>
              )}{" "}
            </>
          )}
        </>
      )}
      {isAddModalOpened && !selectedPost && (
        <AddPostModal handleCloseAddModal={handleCloseAddModal} />
      )}
      {selectedPost && <EditPostModal />}
      <p className="text-left text-2xl pt-8 pb-4 font-tech">
        {loggedIn ? "My posts:" : "Latest posts:"}
      </p>
      <div className="grid lg:grid-cols-3 gap-4 w-full sm:grid-cols-1">
        {posts &&
          posts.map((post, idx) => {
            return <PostCard key={idx} post={post} />;
          })}
      </div>
    </div>
  );
}

export default PostList;
