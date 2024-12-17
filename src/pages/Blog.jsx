import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Respo from "../components/Respo";
import { MutatingDots } from "react-loader-spinner";
import formatMongoDateToHumanReadable from "../utils/format";
import { ThemeContext } from "../App";
import { Helmet } from "react-helmet";

const Blog = () => {
  let { id } = useParams();
  let { theme } = useContext(ThemeContext);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/posts/${id}`)
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
    <div className="lg:px-20 min-h-screen flex flex-col items-center md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden pb-10">
      {data ? (
        <Helmet>
          <meta property="og:title" content={data.headline} />
          <meta property="description" content={data.desc.slice(0, 100)} />
          <meta property="image" content={data.image} />
          <meta name="author" content="Sudip Acharya" />
          <link rel="canonical" href={`https://sudipacharya456.com.np/${id}`} />
          <meta
            property="og:url"
            content={`https://sudipacharya456.com.np/blogs/${id}`}
          />
          <title>{data.headline}</title>
          <meta property="og:type" content="article" />
        </Helmet>
      ) : (
        ""
      )}
      <Navbar />
      <Respo
        list={{
          Home: "/",
          Blogs: "/blogs",
        }}
      />
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

      {data ? (
        <>
          <div className="flex flex-col w-full md:w-[60%]  items-center justify-center mt-10 ">
            <img
              className="w-full  md:h-96 object-cover  rounded-3xl shadow-md"
              src={data.image}
              alt=""
            />
            <div className="w-full px-2 py-3 flex items-center justify-between">
              <div className="author flex gap-2 items-center capitalize ">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://res.cloudinary.com/dgcpqppcd/image/upload/v1723882963/uploads/fsreananmo1jcsbsl7ti.jpg"
                  alt="author"
                />
                <p className="opacity-60 leading-none">{data.author}</p>
              </div>
              <div className="date">
                <p className="opacity-60 text-right leading-none">
                  {formatMongoDateToHumanReadable(data.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <article className="desc flex flex-col items-center">
            <h1 className="md:text-[34px] text-2xl font-medium text-center mt-2 leading-tight md:w-[60%]">
              {data.headline}
            </h1>
            <div className="mt-4 md:w-[60%] opacity-85 text-base">
              {data.desc?.split("\n").map(
                (e, index) => {
                  if (e.startsWith("##")) {
                    let tl = e.split("");
                    tl.splice(0, 2);
                    let yy = tl.join("");
                    return (
                      <h2 key={index} className="font-medium text-xl">
                        {yy}
                        <br />
                      </h2>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {e}
                        <br />
                      </p>
                    );
                  }
                }
                //  (
                //   <span key={index}>
                //     {li} <br />
                //   </span>
                // )
              )}
            </div>
          </article>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Blog;
