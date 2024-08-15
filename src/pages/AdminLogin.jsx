import Login from "../components/Login";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  function handleLogin({ username, password }) {
    axios
      .post(
        `${config.apiUrl}/admin`,
        { username: username, password: password },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setLoggedIn(true);
          Cookies.set("token", response.data.token);
          navigate("/admin");
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <div className="lg:px-20 min-h-screen flex items-center justify-center flex-col md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
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
