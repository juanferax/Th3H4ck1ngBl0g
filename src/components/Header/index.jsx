import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase";
import AuthenticationContext from "../../context/AuthenticationContext";

function Header({ openLoginModal }) {
  const { loggedIn, setLoggedIn } = useContext(AuthenticationContext);

  const handleLogout = () => {
    signOut(firebaseAuth);
    setLoggedIn(false);
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
          onClick={openLoginModal}
        >
          Login
        </button>
      ) : (
        <div className="flex items-center">
          <p className="pr-5 text-white">Logged in as Juanferax</p>
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
