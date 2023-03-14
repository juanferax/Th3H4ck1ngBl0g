import React, { useState } from "react";

function Header() {
  // colorhunt.co

  // preguntar por let var y const

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 h-16 flex items-center justify-between p-4">
      <p className="font-semibold">Welcome to the Th3 Hack1ng Bl0g</p>
      <button className="bg-purple-800 border rounded-md p-1 w-16">
        Login
      </button>
    </div>
  );
}

export default Header;
