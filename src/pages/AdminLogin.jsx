import Login from "../components/Login";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/is-logged-in`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status == "success") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        navigate("/login");
        console.log(err.message);
      });
  }, []);

  // axios.defaults.withCredentials = true;
  function handleLogin({ username, password }) {
    axios
      .post(
        `${config.apiUrl}/admin/login`,
        {
          username: username,
          password: password,
        },

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          navigate("/admin");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <div className="lg:px-20 min-h-screen flex items-center justify-center flex-col md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
      <Helmet>
        <title>Login - Sudip Acharya</title>
      </Helmet>
      <div className="md:w-[70%] w-full">
        <div>
          <h1 className="text-[41px] font-semibold">Welcome Back Cheif!</h1>
          <Login outForm={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
