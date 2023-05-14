import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePosts } from "../../context/postsReducer";
import { useContext, useState } from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
// import {
//   faThumbsUp,
//   faThumbsDown,
// } from "@fortawesome/free-regular-svg-icons";
// import {
//   faThumbsUp as faThumbsUpFill,
//   faThumbsDown as faThumbsDownFill,
// } from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faTrash,
  faCaretDown,
  faCaretUp,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { Popover } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

function PostCard({ post }) {
  const { dispatch } = usePosts();

  const { loggedIn } = useContext(AuthenticationContext);

  // const [like, setLike] = useState(false);
  // const [dislike, setDislike] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleActionsPopover = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  // const likePost = () => {
  //   setLike((prev) => !prev);
  //   setDislike(false);
  // };

  // const dislikePost = () => {
  //   setDislike((prev) => !prev);
  //   setLike(false);
  // };

  const handleDelete = async () => {
    try {
      const postDoc = doc(db, "posts", post.id);
      await deleteDoc(postDoc);
      handleActionsPopover();
    } catch (err) {
      console.error(err);
    }
  };

  const shortContent = (content, count) => {
    if (content.length > count) {
      content = content.substring(0, count) + "...";
    }
    return content;
  };

  return (
    <div
      className="border border-black rounded-md relative bg-gray-50"
      // style={{ width: 491 }}
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
          <div
            className="bg-white absolute top-0 right-0 p-2 m-2 rounded-md cursor-pointer aspect-square flex border border-gray-400"
            // onClick={() => dispatch({ type: "selectPost", payload: post })}
            onClick={handleActionsPopover}
          >
            <FontAwesomeIcon
              className="aspect-square text-xl"
              icon={open ? faCaretUp : faCaretDown}
            />
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleActionsPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <ul className="cursor-pointer">
              <li
                className="flex flex-row justify-end items-center pl-2 pr-2 p-1 hover:bg-gray-100 hover:text-cyan-600"
                onClick={() => {
                  handleActionsPopover();
                  dispatch({ type: "selectPost", payload: post });
                }}
              >
                <p className="text-lg">Edit</p>&nbsp;&nbsp;
                <FontAwesomeIcon className="text-xl" icon={faPenToSquare} />
              </li>
              <li
                className="flex flex-row justify-end items-center pl-2 pr-2 p-1 hover:bg-gray-100 hover:text-red-600"
                onClick={handleDelete}
              >
                <p className="text-lg">Delete</p>&nbsp;&nbsp;
                <FontAwesomeIcon
                  className="text-xl"
                  style={{ width: 20 }}
                  icon={faTrash}
                />
              </li>
            </ul>
          </Popover>
        </>
      )}
      <div className="p-2">
        <p className="font-semibold text-xl"> {post.title} </p>
        <p className="text-gray-600">{!loggedIn && "Author: " + post.author}</p>
        <p className="text-gray-600"> {post.publicationDate} </p>
        {/* skeleton */}
        {/* <div className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 h-2 w-5/6 my-1"></div>
        <div className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 h-2 w-3/5"></div> */}
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
      {/* {loggedIn && (
        <>
          <div className="absolute bottom-0 right-8 p-2 m-2 rounded-md cursor-pointer aspect-square flex">
            <FontAwesomeIcon
              className="text-2xl"
              icon={like ? faThumbsUpFill : faThumbsUp}
              onClick={likePost}
            />
          </div>
          <div className="absolute bottom-0 right-0 p-2 m-2 rounded-md cursor-pointer aspect-square flex">
            <FontAwesomeIcon
              className="text-2xl"
              icon={dislike ? faThumbsDownFill : faThumbsDown}
              onClick={dislikePost}
              flip="horizontal"
            />
          </div>
        </>
      )} */}
    </div>
  );
}

export default PostCard;
