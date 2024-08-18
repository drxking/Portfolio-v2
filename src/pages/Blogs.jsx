import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Respo from "../components/Respo";
import config from "../config";
import BlogCard from "../components/BlogCard";
import { MutatingDots } from "react-loader-spinner";
import { ThemeContext } from "../App";
import { Helmet } from "react-helmet";

const Blogs = () => {
  let { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/posts`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="lg:px-20 min-h-screen flex flex-col md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
      <Helmet>
        <title>Blogs - Sudip Acharya</title>
      </Helmet>
      <Navbar />
      <Respo
        list={{
          Home: "/",
          Blogs: "/blogs",
        }}
      />
      <h1 className="text-3xl font-semibold px-2 md:px-10 py-4 ">BLOGS</h1>
      {loading ? (
        <div className="flex-1 w-full flex items-center justify-center">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color={theme ? "#e5e5e5" : "#111"}
            secondaryColor={theme ? "#e5e5e5" : "#111"}
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        ""
      )}
      {error ? <p>Error:{error.message}</p> : ""}
      {data.map((hell, index) => (
        <li className="list-none" key={index}>
          <BlogCard
            headline={hell.headline}
            desc={hell.desc}
            author={hell.author}
            image={hell.image}
            id={hell._id}
            createdAt={hell.createdAt}
          />
        </li>
      ))}
    </div>
  );
};

export default Blogs;
