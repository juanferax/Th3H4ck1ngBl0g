import React, { useState } from "react";
import LoginModal from "../LoginModal";

function Header() {
  // colorhunt.co

  const [loggedIn, setLoggedIn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <div className="sticky top-0 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 h-16 flex items-center justify-between p-4">
      <p className="font-semibold">Welcome to the Th3 H4ck1ng Bl0g</p>
      <button className="bg-purple-800 border rounded-md p-1 w-16">
        Login
      </button>
      {openLoginModal && <LoginModal />}
    </div>
  );
}

export default Header;
