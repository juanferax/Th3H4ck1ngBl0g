import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Switch, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const AccessSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
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

export const EditPostModal = ({ checked, missingData, postInfo }) => (
  <div className="bg-slate-100 rounded-md p-5 mt-5">
    <p className="text-xl pb-5 font-semibold">Edit post</p>
    <form>
      <p className="text-lg font-medium">Access:</p>
      <div className="mb-3 pt-1 flex items-center">
        <AccessSwitch name="public" checked={checked} /> &nbsp;
        <p className="italic">{checked ? "PUBLIC" : "PRIVATE"}</p>
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
            missingData && !postInfo.content ? "This field cannot be empty" : ""
          }
          multiline={true}
          rows={8}
          className="w-full"
          name="content"
          value={postInfo.content}
          size="small"
        />
      </div>
      <button
        className="border rounded-md py-1 px-2 text-white"
        style={{ backgroundColor: "#072227" }}
      >
        Update <FontAwesomeIcon className="pl-1" icon={faFileCircleCheck} />
      </button>
    </form>
  </div>
);

EditPostModal.propTypes = {
  /**
   * Whether there is a user logged in or not
   */
  checked: PropTypes.bool.isRequired,
  /**
   * The recent posts to show on the home page
   */
  missingData: PropTypes.bool.isRequired,
  /**
   * The number columns for the posts grid
   */
  postInfo: PropTypes.object.isRequired,
};

EditPostModal.defaultProps = {
  checked: false,
  missingData: false,
};
