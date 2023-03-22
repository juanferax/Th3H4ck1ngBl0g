import React from "react";

function LoginModal() {
  return (
    <div className="border border-black rounded-md bg-white absolute right-4 top-3.5 p-3 shadow-2xl">
      <h1 className="text-lg font-semibold italic pb-2">Login</h1>
      <form className="flex flex-col" action="">
        {/* <p>Username: </p> */}
        <input
          className="border-b pl-0.5 mb-3"
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        {/* <p>Password: </p> */}
        <input
          className="border-b pl-0.5"
          type="text"
          name="password"
          id="password"
          placeholder="password"
        />
        <div className="flex justify-center  pt-3">
          <button className="border rounded-md p-0.5 w-20 bg-cyan-500">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginModal;
