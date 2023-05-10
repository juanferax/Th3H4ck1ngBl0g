import React, { useState } from "react";
import { useAuthentication } from "../../context/authenticationReducer";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase";

function Header() {
  const {
    state: { loggedIn },
    dispatch,
  } = useAuthentication();

  const handleOpenLoginModal = () => {
    dispatch({ type: "openLoginModal" });
  };

  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch({ type: "logout" });
  };

  return (
    <div
      className="z-50 sticky top-0 w-full  h-16 flex items-center justify-between p-4 drop-shadow-md"
      style={{ backgroundColor: "#072227" }}
    >
      <p className="font-semibold text-white">
        Welcome to the Th3 H4ck1ng Bl0g
      </p>
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
            Logged in as Juanferax - Role: Admin
          </p>
          <button
            className="border rounded-md py-1 px-2"
            style={{ backgroundColor: "#4FBDBA" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
