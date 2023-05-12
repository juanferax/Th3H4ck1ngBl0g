import React, { useContext, useEffect, useState } from "react";
import { usePosts } from "../../context/postsReducer";
import { firebaseAuth, db, storage } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationContext from "../../context/AuthenticationContext";

export const ACCESS = {
  PUBLIC: "public",
  PRIVATE: "private",
};

function AddPostModal({ handleCloseAddModal }) {
  const { user } = useContext(AuthenticationContext);
  const { dispatch } = usePosts();

  const postsCollectionRef = collection(db, "posts");

  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    access: "",
    imgUrl: "",
  });

  const handleInfoChange = (event) => {
    setPostInfo({ ...postInfo, [event.target.name]: event.target.value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    dispatch({ type: "newEntry", payload: postInfo });
    handleCloseAddModal();
  };

  const handleNewPost = async (event) => {
    event.preventDefault();
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    try {
      addDoc(postsCollectionRef, {
        title: postInfo.title,
        author: user.username,
        publicationDate: `${dia}/${mes}/${anio}`,
        content: postInfo.content,
        access: postInfo.access,
        imgUrl: postInfo.imgUrl,
        author_uid: user.uid,
      });
      // await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      //   (res) => {
      //     addDoc(usersCollectionRef, { username: username, uid: res.user.uid });
      //     setStatus(STATUS.SUCCESS);
      //     setEmail("");
      //     setPassword("");
      //     setUsername("");
      //   }
      // );
    } catch (error) {
      console.error(error);
      let err_message = error.message;
      // setErrorMessage(err_message.slice(10));
      // setStatus(STATUS.ERROR);
    }
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
          onClick={(e) => handleNewPost(e)}
        >
          Create
        </button>
      </form>
    </div>
    // </div>
  );
}

export default AddPostModal;
