import React from "react";
import "../index.css";
import "../assets/style/main.css";
import PropTypes from "prop-types";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = ({
  loggedIn,
  username,
  handleLogout,
  openLoginModal,
}) => (
  <div
    className="z-50 sticky top-0 w-full  h-16 flex items-center justify-between p-4 drop-shadow-md"
    style={{ backgroundColor: "#072227" }}
  >
    <p className="text-white font-tech">Th3 H4ck1ng Bl0g</p>
    {!loggedIn ? (
      <button
        className="rounded-md py-1 px-2 font-semibold"
        style={{ backgroundColor: "#4FBDBA" }}
        onClick={openLoginModal}
      >
        Login
      </button>
    ) : (
      <div className="flex items-center">
        {loggedIn && (
          <>
            <FontAwesomeIcon
              className="text-white pr-2 text-xl"
              icon={faCircleUser}
            />
            <p className="pr-5 text-white font-semibold">{username}</p>
          </>
        )}
        <button
          className="rounded-md py-1 px-2 font-semibold"
          style={{ backgroundColor: "#4FBDBA" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
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
};

Header.defaultProps = {
  loggedIn: false,
};
