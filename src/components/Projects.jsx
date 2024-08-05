import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import project from "../assets/project.js";
import Toggle from "./Toggle.jsx";

const Projects = () => {
  let [clicks, setClicks] = useState(false);
  const popup = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const siteUrlRef = useRef(null);
  const deskImageRef = useRef(null);
  const dateRef = useRef(null);
  const techRef = useRef(null);
  const projects = useRef(null);


  useGSAP(() => {
    if (clicks) {
      gsap.to(popup.current, {
        top: `0%`,
        duration: 0.5,
        ease: "power2",
      });
    } else {
      gsap.to(popup.current, {
        top: `100%`,
        duration: 0.5,
      });
    }
  }, [clicks]);

  function handleOnClick({ title, desc, desk_image, date, tech, url }) {
    deskImageRef.current.src = desk_image;
    let clutter = "";
    tech.forEach((tec) => {
      clutter += `<li class="text-xs bg-[--text-color] px-2 py-1 w-fit rounded-full text-[--primary-color]">${tec}</li>`;
    });
    document.body.style.overflow = `hidden`;
    titleRef.current.innerHTML = title;
    descRef.current.innerHTML = desc.split("\n").join("<br />");
    dateRef.current.innerHTML = date;
    techRef.current.innerHTML = clutter;
    siteUrlRef.current.href = url;
    setClicks(true);
  }
  function handleCloseOnClick() {
    document.body.style.overflow = `scroll`;
    setClicks(false);
  }

  return (
    <div
      id="projects"
      ref={projects}
      className="flex flex-col items-center mb-32"
    >
      <h1 className="text-3xl font-semibold w-full md:w-fit">Projects</h1>

      <div className=" mt-14 flex lg:gap-4 gap-20 flex-wrap justify-center">
        {project.map((one) => (
          <div
            onClick={() => {
              handleOnClick({
                url: one.site_url,
                title: one.title,
                desc: one.desc,
                desk_image: one.desk_image,
                mob_image: one.mob_image,
                date: one.date,
                tech: one.tech,
              });
            }}
            key={one.site_url}
            style={{ transform: `rotateX(0)` }}
            className="group card w-full  md:w-96 cursor-pointer"
          >
            <div className="image-wrapper overflow-hidden shadow-lg">
              <img
                src={one.desk_image}
                className="hover:scale-110 duration-500"
                alt="deskimage"
              />
            </div>
            <div className="dets flex justify-between p-2">
              <h1 className="text-md font-light w-fit">{one.title}</h1>
              <button className="text-md font-light flex items-center ">
                Details
                <i className="group-hover:rotate-45 inline-block duration-200 text-lg   ri-arrow-right-up-line"></i>
              </button>
            </div>
            <div className="desc line-clamp-2 text-xs px-2 opacity-75 tracking-wider font-extralight ">
              {one.desc}
            </div>
          </div>
        ))}
      </div>
      <div
        ref={popup}
        className=" flex justify-center items-start projects-popup w-full h-screen  overflow-y-scroll fixed top-[100%]"
      >
        <div className="flex flex-col items-center rounded-t-[35px] md:rounded-t-[50px]  bg-[--primary-alpha-color] backdrop-brightness-[35%] border-t border-gray-500/50 backdrop-blur-[25px] py-7 px-4 md:p-7 mt-20 ">
          <div className="w-full md:w-[80%] flex justify-between mt-5  md:mt-10">
            <div className=" mb-4 ">
              <h1
                ref={titleRef}
                className="md:text-[50px] text-[40px] leading-none font-medium text-white "
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
                className="px-4 py-1 group bg-purple-500 text-white text-sm rounded-full flex items-center w-fit"
              >
                Visit Site
                <i className="group-hover:rotate-45 inline-block duration-200 text-xl   ri-arrow-right-up-line"></i>{" "}
              </a>
            </div>
            <button
              className=" leading-none h-fit py-4  underline text-white"
              onClick={handleCloseOnClick}
            >
              Close
            </button>
          </div>
          <div className="bottom w-full flex flex-col items-center">
            <img
              ref={deskImageRef}
              src="/projects/fintory-desktop.png"
              className="w-[100%] md:w-[80%]"
              alt="hello"
            />
            <p
              ref={descRef}
              className=" text-sm md:w-[80%] mt-4 text-white opacity-75"
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
