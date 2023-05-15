import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { firebaseAuth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import AuthenticationContext from "../../context/AuthenticationContext";

export const ACTIONS = {
  LOGIN: "login",
  SIGNUP: "signup",
};

export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

function LoginSignupModal({ closeLoginModal }) {
  const { setLoggedIn, setUser } = useContext(AuthenticationContext);

  const [action, setAction] = useState(ACTIONS.LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const usersCollectionRef = collection(db, "users");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (res) => {
          const q = query(usersCollectionRef, where("uid", "==", res.user.uid));
          getDocs(q).then((querySnapshot) => {
            const formattedData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
            }));
            setUser(formattedData[0]); // Is this necessary?
          });
        }
      );
      closeLoginModal();
    } catch (error) {
      // console.error(error);
      setErrorMessage("Error (auth/invalid-email-or-password)");
      setStatus(STATUS.ERROR);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (res) => {
          addDoc(usersCollectionRef, {
            username: username,
            email: res.user.email,
            uid: res.user.uid,
          }).then(() => {
            setUser({
              username: username,
              email: res.user.email,
              uid: res.user.uid,
            });
          });
          setStatus(STATUS.SUCCESS);
          setEmail("");
          setPassword("");
          setUsername("");
        }
      );
      closeLoginModal();
    } catch (error) {
      // console.error(error);
      let err_message = error.message;
      setErrorMessage(err_message.slice(10));
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="p-8 rounded-md bg-white flex flex-col items-center w-96"
      >
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
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            className="border border-gray-300 p-1 pl-2.5 mb-4 w-full rounded-lg"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 p-1 pl-2.5 w-full rounded-lg"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                <u
                  className="text-blue-600 cursor-pointer"
                  onClick={() => {
                    setErrorMessage("");
                    setStatus("");
                    setEmail("");
                    setPassword("");
                    setAction(ACTIONS.SIGNUP);
                  }}
                >
                  Sign Up
                </u>
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
                <u
                  className="text-blue-600 cursor-pointer"
                  onClick={() => {
                    setErrorMessage("");
                    setStatus("");
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    setAction(ACTIONS.LOGIN);
                  }}
                >
                  Login
                </u>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginSignupModal;
