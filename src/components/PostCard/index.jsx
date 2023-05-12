import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePosts } from "../../context/postsReducer";
import { useContext } from "react";
import AuthenticationContext from "../../context/AuthenticationContext";

function PostCard({ post }) {
  const { dispatch } = usePosts();

  const { loggedIn } = useContext(AuthenticationContext);

  return (
    <div className="border border-black rounded-md relative bg-gray-50">
      <img
        className="rounded-t-md"
        src="https://media.istockphoto.com/id/1270770086/photo/commercial-buildings-view-from-low-angle.jpg?s=612x612&w=0&k=20&c=auL9cSRdLJjujIhq7anW0wZi_j-1EzFpv6OhvSBMQQY="
        alt="blog-img"
      />
      {loggedIn && (
        <div
          className="bg-white absolute top-0 right-0 p-2 m-2 rounded-md cursor-pointer aspect-square flex"
          onClick={() => dispatch({ type: "selectPost", payload: post })}
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
          <a href={"#/" + post.id} className="underline text-left w-full">
            Read more
          </a>{" "}
          →
        </p>
      </div>
    </div>
  );
}

export default PostCard;
