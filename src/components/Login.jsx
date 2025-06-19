import React, { useRef } from "react";
const Login = ({ outForm }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    outForm({ username, password });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-2 w-full b md:w-96 mt-4"
    >
      <input
        ref={usernameRef}
        className="px-6 py-6 focus:outline-none focus:bg-gray-700/20 rounded-xl bg-transparent border border-gray-600 w-full"
        placeholder="Username"
        type="text"
      />
      <input
        ref={passwordRef}
        className="px-6 py-6 focus:outline-none focus:bg-gray-700/20  rounded-xl bg-transparent border border-gray-600 w-full"
        placeholder="Password"
        type="password"
        name="password"
        id="password"
      />

      <input
        className="px-10 py-3 bg-purple-500 rounded-xl text-gray-300 cursor-pointer"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default Login;
