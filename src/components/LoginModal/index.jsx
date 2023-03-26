import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuthentication } from "../../context/authenticationReducer";

function LoginModal({ handleCloseLoginModal }) {
  const { dispatch } = useAuthentication();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "login", payload: credentials });
    handleCloseLoginModal();
  };

  return (
    <div className="absolute right-4 top-3.5 p-3 drop-shadow-md border border-black rounded-md bg-white">
      <p className="text-lg font-semibold pb-2">Login</p>
      <FontAwesomeIcon
        className="absolute top-3 right-3 text-xl cursor-pointer"
        onClick={handleCloseLoginModal}
        icon={faCircleXmark}
      />
      <form className="flex flex-col" action="">
        {/* <p>Username: </p> */}
        <input
          className="border-b pl-0.5 mb-3"
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={handleInputChange}
        />
        {/* <p>Password: </p> */}
        <input
          className="border-b pl-0.5"
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <div className="flex justify-center  pt-3">
          <button
            className="border border-black rounded-lg p-0.5 w-20"
            style={{ backgroundColor: "#4FBDBA" }}
            onClick={(e) => {
              handleLoginSubmit(e);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginModal;
