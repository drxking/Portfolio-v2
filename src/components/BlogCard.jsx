import React from "react";
import { Link } from "react-router-dom";
import formatMongoDateToHumanReadable from "../utils/format";

const BlogCard = ({
  headline,
  desc,
  image,
  author,
  id,
  createdAt,
  isAdmin,
}) => {
  return (
    <>
      {isAdmin ? (
        <Link to={`/edit/${id}`}>
          <div className="w-full flex md:flex-row flex-col justify-center  md:justify-start items-center gap-5 md:py-4 py-4 px-2 md:px-10">
            <div className="left md:h-52 md:w-64 w-full">
              <img
                className=" rounded-3xl w-full h-full shadow-lg object-cover"
                src={image}
                alt={headline}
              />
            </div>
            <div className="right w-full md:w-3/4 py-1  md:py-4">
              <h1 className="text-2xl font-medium capitalize mb-2 line-clamp-2">
                {headline}
              </h1>
              <p className="opacity-80 font-light tracking-wide text-sm mb-2 line-clamp-3">
                {desc}
              </p>
              <div className="avatar py-2 flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://res.cloudinary.com/dgcpqppcd/image/upload/v1723882963/uploads/fsreananmo1jcsbsl7ti.jpg"
                    alt="hello"
                  />
                  <p className="opacity-75 text-sm capitalize">{author}</p>
                </div>
                <p className="opacity-75 text-sm capitalize">
                  {formatMongoDateToHumanReadable(createdAt)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/blogs/${id}`}>
          <div className="w-full flex md:flex-row flex-col justify-center  md:justify-start items-center gap-5 md:py-4 py-4 px-2 md:px-10">
            <div className="left md:h-52 md:w-64 w-full">
              <img
                className=" rounded-3xl w-full h-full shadow-lg object-cover"
                src={image}
                alt={headline}
              />
            </div>
            <div className="right w-full md:w-3/4 py-1  md:py-4">
              <h1 className="text-2xl font-medium capitalize mb-2 line-clamp-2">
                {headline}
              </h1>
              <p className="opacity-80 font-light tracking-wide text-sm mb-2 line-clamp-3">
                {desc}
              </p>
              <div className="avatar py-2 flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://res.cloudinary.com/dgcpqppcd/image/upload/v1723882963/uploads/fsreananmo1jcsbsl7ti.jpg"
                    alt="hello"
                  />
                  <p className="opacity-75 text-sm capitalize">{author}</p>
                </div>
                <p className="opacity-75 text-sm capitalize">
                  {formatMongoDateToHumanReadable(createdAt)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default BlogCard;
