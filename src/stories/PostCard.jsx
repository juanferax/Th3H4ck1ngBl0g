import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../index.css";
import {
  faPenToSquare,
  faTrash,
  faCaretDown,
  faCaretUp,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const shortContent = (content, count) => {
  if (content.length > count) {
    content = content.substring(0, count) + "...";
  }
  return content;
};

export const PostCard = ({ loggedIn, post, anchorEl }) => (
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
            icon={Boolean(anchorEl) ? faCaretUp : faCaretDown}
          />
        </div>
      </>
    )}
    <div className="p-2">
      <p className="font-semibold text-xl"> {post.title} </p>
      <p className="text-gray-600">{!loggedIn && "Author: " + post.author}</p>
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

PostCard.propTypes = {
  /**
   * Whether there is a user logged in or not
   */
  loggedIn: PropTypes.bool.isRequired,
  /**
   * The post information
   */
  post: PropTypes.object.isRequired,
  /**
   * The image to show on the post card
   */
  image: PropTypes.string.isRequired,
};

PostCard.defaultProps = {
  loggedIn: false,
  image:
    "https://media.istockphoto.com/id/1270770086/photo/commercial-buildings-view-from-low-angle.jpg?s=612x612&w=0&k=20&c=auL9cSRdLJjujIhq7anW0wZi_j-1EzFpv6OhvSBMQQY=",
};
