import React, { useEffect, useRef, useState } from "react";
import Links from "./Links";
import H1logo from "./H1logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Respo = ({list}) => {
  let [swiped, setswiped] = useState(0);
  let widtht = window.innerWidth;
  const linkArr = Object.entries(list);


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
        if (endY - startY >= 20 || endY - startY <= -20) {
          if (!XX) {
            YY = true;
          }
        }
        if (!YY) {
          if (end - startX >= 60) {
            XX = true;
            setswiped(false);
            document.body.style.overflow = `hidden`;
            startX = cets.changedTouches[0].screenX;
          } else if (end - startX <= -60) {
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

  function handleLinkClick() {
    setswiped(false);
  }

  return (
    <div className="respo h-screen w-screen bg-[--primary-alpha-color] box-border backdrop-blur-2xl  fixed top-0 right-[-100vw] duration-300 z-10 p-8 flex flex-col  items-start ">
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
      <div className="absolute bottom-10">
        <Links />
      </div>
    </div>
  );
};

export default Respo;
