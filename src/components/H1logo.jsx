import React from "react";
import { Link } from "react-router-dom";

const H1logo = () => {
  return (
    <h1 className="text-md font-semibold leading-[0.9]">
      <Link to="/" className="flex items-center gap-1">
        <img
          className="h-9 w-9 rounded-lg invert"
          src={"/favicon.png"}
          alt={"favicon"}
        />
        Sudip <br />
        Acharya.
      </Link>
    </h1>
  );
};

export default H1logo;
