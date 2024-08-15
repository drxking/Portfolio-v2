import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const skill = Object.entries({
  "ri-javascript-fill":
    "JavaScript knowledge of Mine allows basic web interactivity and functionality development.",
  "ri-nodejs-fill":
    "I have a solid grasp of Node.js and am eager to push my skills further.",
  "ri-tailwind-css-fill":
    "I've got a knack for Tailwind CSS and I'm keen to polish my skills.",
  "ri-html5-fill":
    "With strong HTML skills, I create responsive and dynamic websites effortlessly.",
  "ri-css3-fill":
    "My CSS proficiency enhances web designs with style, responsiveness, and creativity",
  "fa-brands fa-python":
    "I'm keen to broaden my Python skills and explore new horizons.",
  "fa-brands fa-linux":
    "I have basic Linux skills and aim to develop them further.",
  "fa-brands fa-github":
    "I excel in GitHub repository management, collaboration, and version control.",
  "fa-brands fa-docker":
    "I have basic Docker skills, including containerization and deployment.",
  "fa-solid fa-bezier-curve":
    "I excel in GSAP, creating dynamic and captivating animations.",
});

const Skills = () => {
  let refff = useRef();
  useGSAP(() => {
    let widtht = window.innerWidth;
    if (widtht < 768) {
      let tt = refff.current.querySelectorAll(".ind");
      tt.forEach((yy) => {
        gsap.from(yy, {
          opacity: 0,
          y: `70%`,
          scale: 0.7,
          rotateX: -90,
          duration: 0.4,
          scrollTrigger: {
            trigger: yy,
            start: "top bottom",
            end: "top 80%",
          },
        });
      });
    }else{
      // let tt = refff.current.querySelectorAll(".ind");
        gsap.from(".ind", {
          opacity: 0,
          duration: 1.5,
          stagger:0.07,
          scrollTrigger: {
            trigger: "#skills",
            start: `50% bottom`,
            end:"bottom 70%",
            // markers:true,
            scrub:1
          },
        });
    }
  }, []);

  return (
    <div
      ref={refff}
      id="skills"
      className="mb-32 flex flex-col items-center pt-16 mt-2"
    >
      <h1 className="text-3xl font-semibold mb-10 ">Skills</h1>
      <ul className="flex  flex-1 gap-8 flex-wrap justify-center">
        {skill.map(([icons, desc]) => (
          <li key={desc} style={{ perspective: "300px" }}>
            <div className="ind w-52 flex flex-col items-center gap-6 origin-top ">
              <i className={`${icons} text-[80px] leading-none h-24`}></i>
              <p className="text-center text-sm ">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
