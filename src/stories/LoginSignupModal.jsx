import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PropTypes from "prop-types";

export const ACTIONS = {
  LOGIN: "login",
  SIGNUP: "signup",
};

export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const LoginSignupModal = ({
  username,
  email,
  password,
  closeLoginModal,
  action,
  handleLogin,
  handleSignIn,
  status,
  errorMessage,
}) => (
  <div style={{ height: 430 }}>
    <div className="absolute border p-8 rounded-md bg-white flex flex-col items-center w-96">
      {action === ACTIONS.LOGIN ? (
        <p className="text-3xl pt-3 pb-10">Login</p>
      ) : (
        <p className="text-3xl pt-3 pb-10">Sign Up</p>
      )}
      <FontAwesomeIcon
        className="absolute top-4 right-4 text-xl cursor-pointer"
        onClick={closeLoginModal}
        icon={faXmark}
      />
      <form className="flex flex-col items-center w-full" action="">
        {action === ACTIONS.SIGNUP && (
          <input
            className="border border-gray-300 p-1 pl-2.5 mb-4 w-full rounded-lg"
            type="text"
            name="username"
            placeholder="username"
            value={username}
          />
        )}
        <input
          className="border border-gray-300 p-1 pl-2.5 mb-4 w-full rounded-lg"
          type="email"
          name="email"
          placeholder="email"
          value={email}
        />
        <input
          className="border border-gray-300 p-1 pl-2.5 w-full rounded-lg"
          type="password"
          name="password"
          placeholder="password"
          value={password}
        />
        {action === ACTIONS.LOGIN ? (
          <>
            <div className="flex justify-center py-4 w-full">
              <button
                className="rounded-3xl p-0.5 w-full"
                style={{ backgroundColor: "#4FBDBA" }}
                onClick={(e) => {
                  handleLogin(e);
                }}
              >
                <p className="text-white py-1 font-semibold">Login</p>
              </button>
            </div>
            <div className="pb-6 text-center">
              {status === STATUS.SUCCESS ? (
                <p className="text-green-600">Login successful</p>
              ) : (
                <p className="text-red-600">{errorMessage}</p>
              )}
            </div>
            <hr className="w-full mb-5 bg-gray-300" />
            <p className="pb-5">
              Don't have an acount yet?{" "}
              <u className="text-blue-600 cursor-pointer">Sign Up</u>
            </p>
          </>
        ) : (
          <>
            <div className="flex justify-center py-4 w-full">
              <button
                className="rounded-3xl p-0.5 w-full"
                style={{ backgroundColor: "#4FBDBA" }}
                onClick={(e) => {
                  handleSignIn(e);
                }}
              >
                <p className="text-white py-1 font-semibold">Register</p>
              </button>
            </div>
            <div className="pb-6 text-center">
              {status === STATUS.SUCCESS ? (
                <p className="text-green-600">
                  Register successful, you are now logged in
                </p>
              ) : (
                <p className="text-red-600">{errorMessage}</p>
              )}
            </div>
            <hr className="w-full mb-5 bg-gray-300" />
            <p className="pb-5">
              Already have an acount?{" "}
              <u className="text-blue-600 cursor-pointer">Login</u>
            </p>
          </>
        )}
      </form>
    </div>
  </div>
);

LoginSignupModal.propTypes = {
  /**
   * Whether an user wants to Login or Sign Up
   */
  action: PropTypes.oneOf(["login", "signup"]),
};

LoginSignupModal.defaultProps = {
  action: "login",
};
