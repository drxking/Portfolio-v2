import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ProjectCards = ({ handleOnClick, one, onLoad }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      onLoad();
    }
  }, [loaded]);

  const handleImageLoad = () => {
    setLoaded(true);
  };
  const card = useRef(null);

  useGSAP(() => {
    let cards = card.current.querySelector(".wrapper");
    gsap.from(cards, {
      y: `100%`,
      rotateX: -70,
        rotate: -15,
      duration: 0.7,
      scale: 0.7,
      ease: "power2",
      scrollTrigger: {
        trigger: card.current,
        start: "bottom 120%",
        end: "bottom 75%",
        scrub: 1
      },
    });
  }, [loaded]);
  return (
    <div
      ref={card}
      onClick={() => {
        handleOnClick({
          url: one.site_url,
          title: one.title,
          desc: one.desc,
          desk_image: one.desk_image,
          mob_image: one.mob_image,
          date: one.date,
          tech: one.tech,
          alert:one.alert
        });
      }}
      key={one.site_url}
      style={{ perspective: "500px" }}
      className="group card w-full  md:w-96 cursor-pointer"
    >
      <div className="wrapper origin-top">
        <div className="image-wrapper  overflow-hidden shadow-lg origin-top">
          <img
            onLoad={handleImageLoad}
            src={one.desk_image}
            className="hover:scale-110 duration-500 h-auto w-full"
            alt="deskimage"
          />
        </div>
        <div className="dets flex justify-between p-2">
          <h1 className="text-md font-light w-fit">{one.title}</h1>
          <button className="text-md font-light flex items-center ">
            Details
            <i className="group-hover:-rotate-45 inline-block duration-200 text-lg   ri-arrow-right-up-line"></i>
          </button>
        </div>
        <div className="desc line-clamp-2 text-xs px-2 opacity-65 tracking-wide">
          {one.desc}
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
