import React from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import AddPostModal from "../components/AddPostModal";
import EditPostModal from "../components/EditPostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import "../assets/style/main.css";
import PropTypes from "prop-types";

export const HomeView = ({
  loggedIn,
  posts,
  gridCols,
  isAddModalOpened,
  handleOpenAddModal,
  handleCloseAddModal,
  selectedPost,
}) => (
  <div className="home" style={{ backgroundColor: "#35858B" }}>
    <p
      className="py-5 text-center title"
      style={{ fontSize: 60, color: "#072227" }}
    >
      Th3 H4ck1ng Bl0g
    </p>
    {/* PostList */}
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
      <p className="text-left text-xl pt-5 pb-3 font-semibold">Latest posts:</p>
      <div
        className={["grid", `grid-cols-${gridCols}`, "gap-4 w-full"].join(" ")}
      >
        {posts.map((post, idx) => {
          return (
            // PostCard
            <div
              key={idx}
              className="border border-black rounded-md relative bg-gray-50"
            >
              <img
                className="rounded-t-md"
                src="https://media.istockphoto.com/id/1270770086/photo/commercial-buildings-view-from-low-angle.jpg?s=612x612&w=0&k=20&c=auL9cSRdLJjujIhq7anW0wZi_j-1EzFpv6OhvSBMQQY="
                alt="blog-img"
              />
              {loggedIn && (
                <div
                  className="bg-white absolute top-0 right-0 p-2 m-2 rounded-md cursor-pointer aspect-square flex"
                  // onClick={() => dispatch({ type: "selectPost", payload: post })}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              )}
              <div className="p-2">
                <p className="font-semibold text-xl"> {post.title} </p>
                <p className="text-gray-600"> {post.publicationDate} </p>
                <div className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 h-2 w-5/6 my-1"></div>
                <div className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 h-2 w-3/5"></div>
                <p>
                  <a
                    href={"#/" + post.id}
                    className="underline text-left w-full"
                  >
                    Read more
                  </a>{" "}
                  →
                </p>
              </div>
            </div>
          );
          //   return <PostCard key={idx} loggedIn={false} post={post} />;
        })}
      </div>
    </div>
  </div>
);

HomeView.propTypes = {
  /**
   * Whether there is a user logged in or not
   */
  loggedIn: PropTypes.bool.isRequired,
  /**
   * The recent posts to show on the home page
   */
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The number columns for the posts grid
   */
  gridCols: PropTypes.oneOf([1, 2, 3, 4]),
};

HomeView.defaultProps = {
  loggedIn: false,
  gridCols: 3,
};
