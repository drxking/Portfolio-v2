import React, { useEffect, useRef, useState } from "react";
import Links from "./Links";
import H1logo from "./H1logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Respo = () => {
  let [swiped, setswiped] = useState(0);
  let widtht = window.innerWidth;
  const linkArr = Object.entries({
    Skills: "#skills",
    Projects: "#projects",
    "About me": "#",
    Contact: "#",
  });
  const icons = [
    "ri-nodejs-line",
    "ri-settings-4-line",
    "ri-account-circle-line",
    "ri-contacts-book-line",
  ];

  useEffect(() => {
    if (widtht < 768) {
      let start = 0;
      window.addEventListener("touchstart", (dets) => {
        start = dets.changedTouches[0].screenX;
      });

      window.addEventListener("touchend", (cets) => {
        let end = cets.changedTouches[0].screenX;
        if (end - start >= 100) {
          // respo.current.style.right = `-100vw`;
          setswiped(false);
        } else if (end - start <= -150) {
          // respo.current.style.right = `0`;
          setswiped(true);
        }

        // Reset the values after processing
        start = 0;
        end = 0;
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
        stagger: 0.1,
        duration: 0.1,
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
        {linkArr.map(([names, href], index) => (
          <li
            key={names}
            className="relative text-[7vw] text-[--text-color]  pb-1 pt-0 w-full flex items-center gap-1"
          >
            <i className={`${icons[index]} text-2xl`}></i>
            <a
              className="font-medium font-[oswald] "
              onClick={handleLinkClick}
              href={href}
            >
              {names}
            </a>
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
