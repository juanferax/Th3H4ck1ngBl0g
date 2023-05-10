import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuthentication } from "../../context/authenticationReducer";
import { firebaseAuth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginModal() {
  const { dispatch } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      dispatch({ type: "login" });
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: "closeLoginModal" });
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
        <p className="text-3xl pt-3 pb-10">Login</p>
        <FontAwesomeIcon
          className="absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => dispatch({ type: "closeLoginModal" })}
          icon={faXmark}
        />
        <form className="flex flex-col items-center w-full" action="">
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
          <div className="flex justify-center pt-4 w-full pb-10">
            <button
              className="rounded-3xl p-0.5 w-full"
              style={{ backgroundColor: "#4FBDBA" }}
              onClick={(e) => {
                handleLoginSubmit(e);
              }}
            >
              <p className="text-white py-1 font-semibold">Login</p>
            </button>
          </div>
          <hr className="w-full mb-5 bg-gray-300" />
          <p className="pb-5">
            Don't have an acount yet?{" "}
            <u className="text-blue-600 cursor-pointer">Sign Up</u>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
