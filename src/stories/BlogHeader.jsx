import React from "react";
import LoginModal from "../components/LoginModal";
import "../index.css";
import PropTypes from "prop-types";

export const Header = ({
  loggedIn,
  username,
  role,
  handleOpenLoginModal,
  handleCloseLoginModal,
  openLoginModal,
}) => (
  <div
    className="sticky top-0 w-full h-16 flex items-center justify-between p-4 drop-shadow-md"
    style={{ backgroundColor: "#072227" }}
  >
    <p className="font-semibold text-white">Welcome to the Th3 H4ck1ng Bl0g</p>
    {!loggedIn ? (
      <button
        className="border rounded-md py-1 px-2"
        style={{ backgroundColor: "#4FBDBA" }}
        onClick={handleOpenLoginModal}
      >
        Login
      </button>
    ) : (
      <div className="flex items-center">
        <p className="pr-5 text-white">
          Logged in as {username} - Role: {role}
        </p>
        <button
          className="border rounded-md py-1 px-2"
          style={{ backgroundColor: "#4FBDBA" }}
        >
          Logout
        </button>
      </div>
    )}
    {openLoginModal && (
      <LoginModal handleCloseLoginModal={handleCloseLoginModal} />
    )}
  </div>
);

Header.propTypes = {
  /**
   * Whether there is a user logged in or not
   */
  loggedIn: PropTypes.bool.isRequired,
  /**
   * The username of the user logged in
   */
  username: PropTypes.string.isRequired,
  /**
   * The role of the user logged in
   */
  role: PropTypes.string.isRequired,
};

Header.defaultProps = {
  loggedIn: false,
};
