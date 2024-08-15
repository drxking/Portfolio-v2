import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import config from "../config";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
const Admin = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    let token = Cookies.get("token");
    token ? "" : navigate("/login");
    axios
      .post(`${config.apiUrl}/api/is-logged-in`, { token: token })
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status == "failure") {
          navigate("/login");
        } else if (response.data.status == "success") {
          setIsLogged(true);
        }
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/posts`)
      .then((response) => {
        setIsLoading(false);
        setData(response.data);
      })
      .catch((err) => {
        setIsError(err.message);
      });
  }, [isLogged]);

  return (
    <div className="lg:px-20 min-h-screen flex flex-col md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
      <div>
        <Navbar isAdmin={true} />
        {isLoading ? <p>Loading...</p> : ""}
        {isError ? <p>error...</p> : ""}
        {data?.map((hello) => (
          <BlogCard
            isAdmin={true}
            key={hello.createdAt}
            headline={hello.headline}
            desc={hello.desc}
            author={hello.author}
            id={hello._id}
            createdAt={hello.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
