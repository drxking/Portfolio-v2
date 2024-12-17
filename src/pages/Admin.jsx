import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import Navbar from "../components/Navbar";
import Respo from "../components/Respo";
import BlogCard from "../components/BlogCard";
import { MutatingDots } from "react-loader-spinner";
import { ThemeContext } from "../App";
import { Link } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  let { theme } = useContext(ThemeContext);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/is-logged-in`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status == "failure") {
          navigate("/login");
        } else if (response.data.status == "success") {
          setIsLogged(true);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/admin/posts`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        setData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
      });
  }, [isLogged]);

  return (
    <>
      {isLogged ? (
        <div className="lg:px-20 min-h-screen flex flex-col md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
          <div>
            <div className="controls flex gap-6 items-center">
              <Navbar isAdmin={true} />
              <Respo
                list={{
                  Home: "/",
                  Blogs: "/admin",
                }}
              />
              <Link
                to={"/create"}
                className="bg-purple-400 whitespace-nowrap px-6 py-2 rounded-md text-sm text-[#e5e5e5]"
              >
                Write New Blog
              </Link>
            </div>

            {isLoading ? (
              <div className="flex-1 w-full flex items-center justify-center">
                <MutatingDots
                  visible={true}
                  height="100"
                  width="100"
                  color={theme ? "#e5e5e5" : "#111"}
                  secondaryColor={theme ? "#e5e5e5" : "#111"}
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                />
              </div>
            ) : (
              ""
            )}
            {isError ? <p>Error:{isError.message}</p> : ""}

            {data?.map((hello) => (
              <BlogCard
                isAdmin={true}
                key={hello.createdAt}
                headline={hello.headline}
                desc={hello.desc}
                author={hello.author}
                id={hello._id}
                image={hello.image}
                createdAt={hello.createdAt}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Admin;
