import React from "react";
import AddPostModal from "../components/AddPostModal";
import EditPostModal from "../components/EditPostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faFileCirclePlus,
  faHourglassHalf,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import "../assets/style/main.css";
import PropTypes from "prop-types";

const shortContent = (content, count) => {
  if (content.length > count) {
    content = content.substring(0, count) + "...";
  }
  return content;
};

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
      className="py-5 text-center font-tech"
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
              className="rounded-md py-1 px-2 text-white"
              style={{ backgroundColor: "#072227" }}
              onClick={handleOpenAddModal}
            >
              New entry{" "}
              <FontAwesomeIcon className="pl-1" icon={faFileCirclePlus} />
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
      <p className="text-left text-xl pt-5 pb-3 font-tech">Latest posts:</p>
      <div
        className={["grid", `grid-cols-${gridCols}`, "gap-4 w-full"].join(" ")}
      >
        {posts.map((post, idx) => {
          return (
            // PostCard
            <div
              className="border border-black rounded-md relative bg-gray-50"
              style={{ width: 490 }}
            >
              <img
                className="rounded-t-md"
                src={
                  post.imgUrl
                    ? post.imgUrl
                    : "https://media.istockphoto.com/id/1270770086/photo/commercial-buildings-view-from-low-angle.jpg?s=612x612&w=0&k=20&c=auL9cSRdLJjujIhq7anW0wZi_j-1EzFpv6OhvSBMQQY="
                }
                style={{ height: 250, width: "100%" }}
                alt="blog-img"
              />
              {loggedIn && (
                <>
                  <div className="bg-white absolute top-0 right-0 p-2 m-2 rounded-md cursor-pointer aspect-square flex border border-gray-400">
                    <FontAwesomeIcon
                      className="aspect-square text-xl"
                      icon={faCaretDown}
                    />
                  </div>
                </>
              )}
              <div className="p-2">
                <p className="font-semibold text-xl"> {post.title} </p>
                <p className="text-gray-600">
                  {!loggedIn && "Author: " + post.author}
                </p>
                <p className="text-gray-600"> {post.publicationDate} </p>
                <p className="pt-2 h-14"> {shortContent(post.content, 90)} </p>
              </div>
              <p className="p-2">
                <a href={"#/" + post.id} className="underline text-left w-full">
                  Read more
                </a>{" "}
                →
              </p>
              <div className="absolute bottom-0 right-0 p-2 flex items-center text-gray-600">
                <FontAwesomeIcon className="text-xs" icon={faHourglassHalf} />
                &nbsp;<p className="italic">{post.readingTime} mins</p>
              </div>
            </div>
          );
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
  gridCols: PropTypes.oneOf([1, 2, 3]),
};

HomeView.defaultProps = {
  loggedIn: false,
  gridCols: 3,
};
