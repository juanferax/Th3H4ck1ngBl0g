import React, { useContext, useEffect, useState } from "react";
import { usePosts } from "../../context/postsReducer";
import { firebaseAuth, db, storage } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationContext from "../../context/AuthenticationContext";
import { Switch, TextField, TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddPostModal({ handleCloseAddModal }) {
  const { user } = useContext(AuthenticationContext);
  const { dispatch } = usePosts();

  const postsCollectionRef = collection(db, "posts");

  const [checked, setChecked] = useState(false);
  const [missingData, setMissingData] = useState(false);

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
    if (!postInfo.title || !postInfo.content) {
      setMissingData(true);
      return;
    }

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    // Calcula la cantidad de palabras en el contenido
    const wordCount = postInfo.content.split(/\s+/g).length;
    // Calcula la duración estimada de la lectura en minutos
    const readingTime = Math.ceil(wordCount / 200);
    try {
      addDoc(postsCollectionRef, {
        ...postInfo,
        author: user.username,
        publicationDate: `${dia}/${mes}/${anio}`,
        readingTime: readingTime,
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
        <div className="mb-3 pt-1 flex items-center">
          <AccessSwitch
            name="public"
            onChange={(e) => switchHandler(e)}
            checked={checked}
          />{" "}
          &nbsp;
          <p className="italic">{postInfo.public ? "PUBLIC" : "PRIVATE"}</p>
        </div>
        <p className="text-lg font-medium">Title:</p>
        <div className="mb-3">
          <TextField
            error={missingData && !postInfo.title}
            helperText={
              missingData && !postInfo.title ? "This field cannot be empty" : ""
            }
            className="w-1/2"
            name="title"
            value={postInfo.title}
            onChange={(e) => handleInfoChange(e)}
            size="small"
            inputProps={{
              style: {
                height: "15px",
                backgroundColor: "#fff",
              },
            }}
          />
        </div>
        <p className="text-lg font-medium">Image URL:</p>
        <div className="mb-3">
          <TextField
            className="w-full"
            name="imgUrl"
            value={postInfo.imgUrl}
            onChange={(e) => handleInfoChange(e)}
            size="small"
            inputProps={{
              style: {
                height: "15px",
                backgroundColor: "#fff",
              },
            }}
          />
        </div>
        <p className="text-lg font-medium">Content:</p>
        <div
          className="mb-3 bg-white"
          style={{
            height: 201,
            marginBottom: missingData && !postInfo.content ? 35 : "1rem",
          }}
        >
          <TextField
            error={missingData && !postInfo.content}
            helperText={
              missingData && !postInfo.content
                ? "This field cannot be empty"
                : ""
            }
            multiline={true}
            rows={8}
            className="w-full"
            name="content"
            value={postInfo.content}
            onChange={(e) => handleInfoChange(e)}
            size="small"
          />
        </div>
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
