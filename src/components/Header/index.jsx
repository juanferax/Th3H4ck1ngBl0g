import React, { useContext, useState } from "react";
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
    <div className="sticky top-0 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 h-16 flex items-center justify-between p-4 drop-shadow-md">
      <p className="font-semibold">Welcome to the Th3 H4ck1ng Bl0g</p>
      {!loggedIn ? (
        <button
          className="bg-purple-800 border rounded-md p-1 w-16"
          onClick={handleOpenLoginModal}
        >
          Login
        </button>
      ) : (
        <div className="flex items-center">
          <p className="pr-5">Logged in as Juanferax - Role: Admin</p>
          <button
            className="bg-purple-800 border rounded-md p-1 w-16"
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
