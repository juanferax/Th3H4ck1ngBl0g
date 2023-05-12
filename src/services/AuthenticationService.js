import { useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthenticationContext from "../context/AuthenticationContext";

export default function AuthenticationService() {
  //   const { loggedIn } = useContext(AuthenticationContext);

  const [user, setUser] = useState(null);

  const checkForUser = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) return;
      if (user) return user;
    });
  };

  return {
    checkForUser,
  };
}
