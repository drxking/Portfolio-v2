import { useGSAP } from "@gsap/react";
import Logo from "./H1logo";
import Toggle from "./Toggle";
import gsap from "gsap";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = ({ isAdmin }) => {
  const [clicked, setClicked] = useState(false);
  useGSAP(() => {
    if (clicked) {
      let tl = gsap.timeline();
      tl.to(".popup", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      }),
        tl.to(".popup", {
          opacity: 0,
          scale: 0,
          delay: 2,
          duration: 0.3,
        });
      setClicked(false);
    }
  }, [clicked]);

  function handleCopy() {
    setClicked(true);
    navigator.clipboard.writeText("xtre969@gmail.com");
  }

  const links = {
    Blogs: isAdmin ? "/admin" : "/blogs",
  };
  const linkArr = Object.entries(links);

  return (
    <div className="flex items-center justify-between py-5 w-full">
      <div className="left flex items-center gap-10">
        <Logo />
        <ul className="items-center justify-center gap-4 hidden md:flex">
          {linkArr.map(([names, href]) => (
            <li key={names} className="text-sm">
              <Link to={href}>{names}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="right items-center gap-4 flex">
        {!isAdmin ? (
          <>
            <h2 className="text-sm font-medium hidden md:flex">
              Let's Connect
            </h2>
            <div className=" px-1 pl-5 py-1 rounded-full bg-[--solid-color] hidden md:flex">
              <input
                name="email"
                readOnly
                className="text-sm focus:outline-none pointer-events-none font-medium bg-transparent"
                type="text"
                value={"xtre969@gmail.com"}
              />
              <button title="Copy Email" onClick={handleCopy}>
                <i className="ri-file-copy-2-line bg-slate-400 text-[--text-color] p-1 rounded-full focus:outline-none relative ">
                  <div className="popup absolute h-full w-full opacity-0 scale-0 bg-blue-600 rounded-full top-0 left-0">
                    <i className="ri-check-line"></i>
                  </div>
                </i>
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        <Toggle />
      </div>
    </div>
  );
};

export default Navbar;
