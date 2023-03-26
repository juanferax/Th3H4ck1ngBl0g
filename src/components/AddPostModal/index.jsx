import React, { useState } from "react";
import { usePosts } from "../../context/postsReducer";

function AddPostModal({ handleCloseAddModal }) {
  const { dispatch } = usePosts();

  const [postInfo, setPostInfo] = useState({
    title: "",
    author: "Juanferax",
    publicationDate: "23/02/2023",
    content: "",
  });

  const handleInfoChange = (event) => {
    setPostInfo({ ...postInfo, [event.target.name]: event.target.value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    dispatch({ type: "newEntry", payload: postInfo });
    handleCloseAddModal();
  };

  return (
    // <div className="fixed top-0 mt-16 pb-16 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center">
    <div className="bg-slate-100 rounded-md p-3 mt-5">
      <p className="text-xl pb-5 font-semibold">Add new post</p>
      <form>
        <p>Title:</p>
        <input
          className="rounded-md w-1/2 mb-2 border px-0.5"
          type="text"
          name="title"
          value={postInfo.title}
          onChange={(e) => handleInfoChange(e)}
        />
        <p>Content:</p>
        <textarea
          className="rounded-md w-full border px-0.5"
          name="content"
          rows="10"
          value={postInfo.content}
          onChange={(e) => handleInfoChange(e)}
        ></textarea>
        <button
          className="border rounded-md py-1 px-2 text-white"
          style={{ backgroundColor: "#072227" }}
          onClick={(e) => handleSave(e)}
        >
          Create
        </button>
      </form>
    </div>
    // </div>
  );
}

export default AddPostModal;
