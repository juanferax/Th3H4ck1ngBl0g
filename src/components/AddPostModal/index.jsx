import React, { useContext, useEffect, useState } from "react";
import { usePosts } from "../../context/postsReducer";
import { firebaseAuth, db, storage } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationContext from "../../context/AuthenticationContext";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddPostModal({ handleCloseAddModal }) {
  const { user } = useContext(AuthenticationContext);
  const { dispatch } = usePosts();

  const postsCollectionRef = collection(db, "posts");

  const [checked, setChecked] = useState(false);

  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    public: false,
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

  const switchHandler = (event) => {
    setChecked(event.target.checked);
    setPostInfo({ ...postInfo, [event.target.name]: event.target.checked });
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
      handleCloseAddModal();
    } catch (error) {
      console.error(error);
      let err_message = error.message;
      // setErrorMessage(err_message.slice(10));
      // setStatus(STATUS.ERROR);
    }
  };

  const AccessSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      // When Checked
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      // When Unchecked
      "& + .MuiSwitch-track": {
        backgroundColor: "#aa2e25",
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    // <div className="fixed top-0 mt-16 pb-16 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center">
    <div className="bg-slate-100 rounded-md p-5 mt-5">
      <p className="text-xl pb-5 font-semibold">Add new post</p>
      <form>
        <p className="text-lg font-medium">Access:</p>
        <div className="mb-2 pt-1 flex items-center">
          <AccessSwitch
            name="public"
            onChange={(e) => switchHandler(e)}
            checked={checked}
          />{" "}
          &nbsp;
          <p className="italic">{postInfo.public ? "PUBLIC" : "PRIVATE"}</p>
        </div>
        <p className="text-lg font-medium">Title:</p>
        <input
          className="rounded-md w-1/2 mb-2 border p-0.5 pl-1.5"
          type="text"
          name="title"
          value={postInfo.title}
          onChange={(e) => handleInfoChange(e)}
        />
        <p className="text-lg font-medium">Image URL:</p>
        <input
          className="rounded-md w-full mb-2 border p-0.5 pl-1.5"
          type="text"
          name="imgUrl"
          value={postInfo.imgUrl}
          onChange={(e) => handleInfoChange(e)}
        />
        <p className="text-lg font-medium">Content:</p>
        <textarea
          className="rounded-md w-full mb-2 border p-0.5 pl-1.5"
          name="content"
          rows="8"
          value={postInfo.content}
          onChange={(e) => handleInfoChange(e)}
        ></textarea>
        <button
          className="border rounded-md py-1 px-2 text-white"
          style={{ backgroundColor: "#072227" }}
          onClick={(e) => handleNewPost(e)}
        >
          Create <FontAwesomeIcon className="pl-1" icon={faCheck} />
        </button>
      </form>
    </div>
    // </div>
  );
}

export default AddPostModal;
