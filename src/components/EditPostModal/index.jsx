import { faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { usePosts } from "../../context/postsReducer";

function EditPostModal() {
  const {
    state: { selectedPost },
    dispatch,
  } = usePosts();

  const [postInfo, setPostInfo] = useState(selectedPost);

  useEffect(() => {
    setPostInfo(selectedPost);
  }, [selectedPost]);

  const handleInfoChange = (event) => {
    setPostInfo({ ...postInfo, [event.target.name]: event.target.value });
  };

  // !!Preguntar por qué él pasa una función handleCloseModal cuando en el Edit component tiene el dispatch
  // y puede hacer lo mismo que en la función close
  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch({ type: "modify", payload: postInfo });
    dispatch({ type: "selectPost", payload: null });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch({ type: "delete", payload: selectedPost.id });
    dispatch({ type: "selectPost", payload: null });
  };

  return (
    // <div className="fixed top-0 mt-16 pb-16 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center">
    <div className="bg-slate-100 rounded-md p-3 mt-5">
      <p className="text-xl pb-5 font-semibold">Edit post</p>
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
          onClick={(e) => handleUpdate(e)}
        >
          Update <FontAwesomeIcon icon={faRotate} />
        </button>
        <button
          className="border rounded-md ml-1 py-1 px-2 text-white bg-red-600"
          onClick={(e) => handleDelete(e)}
        >
          Delete <FontAwesomeIcon icon={faTrash} />
        </button>
      </form>
    </div>
    // </div>
  );
}

export default EditPostModal;
