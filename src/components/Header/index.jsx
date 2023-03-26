import React, { useState } from "react";
import { useAuthentication } from "../../context/authenticationReducer";
import LoginModal from "../LoginModal";

function Header() {
  const {
    state: { loggedIn },
    dispatch,
  } = useAuthentication();

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <div
      className="sticky top-0 w-full  h-16 flex items-center justify-between p-4 drop-shadow-md"
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
            onClick={() => dispatch({ type: "logout" })}
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
}

export default Header;
