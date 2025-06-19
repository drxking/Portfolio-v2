import { useEffect, useState } from "react";
import Links from "./Links";
import H1logo from "./H1logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Respo = ({ list }) => {
  let [swiped, setswiped] = useState(0);
  const [clicked, setClicked] = useState(false);
  let widtht = window.innerWidth;
  const linkArr = Object.entries(list);
  let email = "xtre969@gmail.com"


  useEffect(() => {
    if (widtht < 768) {
      let startX = 0;
      let startY = 0;
      let YY = false;
      let XX = false;
      window.addEventListener("touchstart", (dets) => {
        startX = dets.changedTouches[0].screenX;
        startY = dets.changedTouches[0].screenY;
      });
      window.addEventListener("touchmove", (cets) => {
        let end = cets.changedTouches[0].screenX;
        let endY = cets.changedTouches[0].screenY;
        if (endY - startY >= 15 || endY - startY <= -15) {
          if (!XX) {
            YY = true;
          }
        }
        if (!YY) {
          if (end - startX >= 15) {
            XX = true;
            setswiped(false);
            document.body.style.overflow = `hidden`;
            startX = cets.changedTouches[0].screenX;
          } else if (end - startX <= -15) {
            XX = true;
            setswiped(true);
            document.body.style.overflow = `hidden`;
            startX = cets.changedTouches[0].screenX;
          }
        }
      });
      window.addEventListener("touchend", () => {
        document.body.style.overflow = `scroll`;

        YY = false;
        XX = false;
      });
    }
  }, []);

  useGSAP(() => {
    if (swiped) {
      gsap.to(".bottom-hr", {
        width: `100%`,
        stagger: -0.1,
      });
      gsap.to(".respo", {
        right: `0vw`,
        duration: 0.1,
        ease: "none",
      });
    } else {
      gsap.to(".bottom-hr", {
        width: `0%`,
      });
      gsap.to(".respo", {
        right: `-100vw`,
        duration: 0.1,
        ease: "none",
      });
    }
  }, [swiped]);
  useGSAP(() => {
    if (clicked) {
      let tl = gsap.timeline();
      tl.to(".popup", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      })
      tl.to(".popup", {
        opacity: 0,
        scale: 0,
        delay: 2,
        duration: 0.3,
      });
      setClicked(false);
    }
  }, [clicked]);

  function handleLinkClick() {
    setswiped(false);
  }

  function handleCopy() {
    setClicked(true);
    navigator.clipboard.writeText(email);
  }
  return (
    <div className="respo h-screen w-screen bg-[--primary-alpha-color] box-border backdrop-blur-2xl  fixed top-0 right-[-100vw] duration-300 z-[99999999999999] p-8 flex flex-col  items-start ">
      <H1logo />

      <ul className="hello gap-6 flex flex-col mt-20 duration-300 w-full">
        {linkArr.map(([names, href]) => (
          <li
            key={names}
            className="relative text-[7vw] text-[--text-color]  pb-1 pt-0 w-full flex items-center gap-1"
          >
            {href.startsWith("#") ? (
              <a
                className="font-medium font-[oswald] "
                onClick={handleLinkClick}
                href={href}
              >
                {names}
              </a>
            ) : (
              <Link
                className="font-medium font-[oswald] "
                onClick={handleLinkClick}
                to={href}
              >
                {names}
              </Link>
            )}

            <div className="bottom-hr bg-[--text-color] w-[0%] h-[1px] absolute bottom-0"></div>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-10 left-0 px-4 w-full">
        <div className="relative px-2 pl-2 py-2 rounded-full backdrop-blur-[3px]  items-center w-full">
          <p
            className="text-sm  text-center px-2 focus:outline-none inline-block pointer-events-none font-medium bg-transparent"
            type="text"
          >
            {
              email
            }
          </p>
          <button title="Copy Email" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={handleCopy}>
            <i className="ri-file-copy-2-line bg-slate-400 text-[--text-color]  p-2 rounded-full focus:outline-none relative ">
              <div className="popup absolute flex items-center justify-center h-full w-full opacity-0 scale-0 bg-blue-600 rounded-full top-0 left-0">
                <i className="ri-check-line"></i>
              </div>
            </i>
          </button>
        </div>
        <div className="pl-4 mt-4">
          <Links />
        </div>
      </div>
    </div>
  );
};

export default Respo;
