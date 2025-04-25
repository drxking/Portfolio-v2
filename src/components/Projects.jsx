import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import project from "../assets/project.js";
import ProjectCards from "./ProjectCards.jsx";
import { useLenis } from "../utils/LenisProvider.jsx";

const Projects = () => {
  let [clicks, setClicks] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  let lenisRef = useLenis();
  const handleImageLoad = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const popup = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const siteUrlRef = useRef(null);
  const deskImageRef = useRef(null);
  const dateRef = useRef(null);
  const techRef = useRef(null);
  const alertRef = useRef(null);
  const projects = useRef(null);

  useGSAP(() => {
    if (clicks) {
      gsap.to(popup.current, {
        top: `0%`,
        duration: 0.5,
        ease: "power2",
        delay: 0.2
      });
    } else {
      gsap.to(popup.current, {
        top: `100%`,
        duration: 0.5,
      });
    }
  }, [clicks]);

  function handleOnClick({ title, desc, desk_image, date, tech, url, alert }) {
    lenisRef.current?.stop();
    deskImageRef.current.src = desk_image;
    let clutter = "";
    tech.forEach((tec) => {
      clutter += `<li class="text-xs bg-[--text-color] px-2 py-1 w-fit rounded-full text-[--primary-color]">${tec}</li>`;
    });
    titleRef.current.innerHTML = title;
    descRef.current.innerHTML = desc;
    dateRef.current.innerHTML = date;
    alertRef.current.innerHTML = alert
      ? `<div class="w-fit mb-4 text-xs font-semibold text-gray-400 flex items-center gap-2 border border-gray-700 rounded-xl backdrop-blur-[20px]  bg-black/80 p-2" ><i class="ri-error-warning-line text-red-500 text-2xl"></i> ${alert} </div>`
      : "";
    techRef.current.innerHTML = clutter;
    if (url == "#") {
      siteUrlRef.current.href = url;
      siteUrlRef.current.removeAttribute("href");
      siteUrlRef.current.innerHTML = `Not Hosted Yet <i class="group-hover:rotate-90 inline-block duration-200 text-xl  ri-close-fill"></i>`;
    } else {
      siteUrlRef.current.href = url;
      siteUrlRef.current.innerHTML = `Visit Site <i class="group-hover:rotate-45 inline-block duration-200 text-xl   ri-arrow-right-up-line"></i>`;
    }
    setClicks(true);
  }
  function handleCloseOnClick() {
    lenisRef.current?.start();
    setClicks(false);
  }
  return (
    <div id="projects" className="flex flex-col items-center mb-32">
      <h1 className="text-3xl font-semibold w-full md:w-fit">Projects</h1>

      <div
        ref={projects}
        className=" mt-14 flex md:gap-x-4 md:gap-y-14 gap-20 flex-wrap justify-center"
      >
        {project.slice(0, currentIndex + 1).map((one) => (
          <ProjectCards
            key={one.title}
            one={one}
            handleOnClick={handleOnClick}
            onLoad={handleImageLoad}
          />
        ))}
      </div>
      <div
        data-lenis-prevent
        ref={popup}
        className=" flex flex-col justify-start z-[999999] overscroll-auto touch-auto items-center projects-popup w-full h-screen overflow-y-auto fixed top-[100%]"
      >

        <div className="w-full">
          <div
            onClick={handleCloseOnClick}
            className="md:h-20 h-36 w-full"
          ></div>
        </div>
        <div className="flex flex-col w-full items-center rounded-t-[35px] md:rounded-t-[50px]  bg-[--primary-alpha-color] backdrop-brightness-[35%] border-t border-gray-600/50 backdrop-blur-[25px] py-7 px-4 md:px-7  ">
          <div className="w-full md:w-[80%]  flex justify-between mt-5  md:mt-10">
            <div className=" mb-4 ">
              <h1
                ref={titleRef}
                className="md:text-[50px] text-[8.5vw] leading-tight font-medium text-white "
              ></h1>
              <p
                ref={dateRef}
                className="text-xs pl-1 opacity-80 text-white capitalize"
              ></p>
              <ul
                ref={techRef}
                className="pt-2 flex gap-2 w-full flex-wrap mb-4 "
              ></ul>
              <a
                ref={siteUrlRef}
                target="_blank"
                className="px-4 py-1 group bg-purple-500 text-white text-sm rounded-full flex items-center w-fit cursor-pointer"
              >
                Visit Site
                <i className="group-hover:rotate-45 inline-block duration-200 text-xl   ri-arrow-right-up-line"></i>
              </a>
            </div>
            <button
              className="group/hello  flex items-center leading-none h-fit  text-white"
              onClick={handleCloseOnClick}
            >
              <span className="overflow-hidden inline-block translate-x-4 pr-2">
                <span className=" inline-block group-hover/hello:translate-x-0 translate-x-14  duration-300 ">
                  Close
                </span>
              </span>
              <i className=" inline-block duration-200 text-[40px]  ri-close-fill group-hover/hello:rotate-90  leading-none"></i>
            </button>
          </div>
          <p ref={alertRef} className="md:w-[80%] w-full"></p>
          <div className="bottom w-full md:w-[80%]  flex flex-col items-center">
            <img
              ref={deskImageRef}
              className="w-full"
              alt="desktopImage"
            />
            <p
              ref={descRef}
              className="w-full mt-2 text-white opacity-75"
            ></p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Projects;
