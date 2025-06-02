import { useGSAP } from "@gsap/react";
import  { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChangingHeading from "./ChangingHeading";
gsap.registerPlugin(ScrollTrigger);

const skill = Object.entries({
  "ri-javascript-fill":
    "JavaScript knowledge of Mine allows basic web interactivity and functionality development.",
  "ri-nodejs-fill":
    "I have a solid grasp of Node.js and am eager to push my skills further.",
  "fa-brands fa-react":
    "I bring ideas to life through interactive, component-driven magic with React.",
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
    "I excel in efficient version control for seamless collaboration.",
  "fa-solid fa-bezier-curve":
    "I excel in GSAP, creating dynamic and captivating animations."
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
          y: `50%`,
          duration: 0.5,
          filter:`blur(3px)`,
          scrollTrigger: {
            trigger: yy,
            start: "top bottom",
            end: "top 80%",
            scrub:1
          },
        });
      });
    }else{
      // let tt = refff.current.querySelectorAll(".ind");
        gsap.from(".ind", {
          opacity: 0,
          duration: 1.5,
          stagger:0.07,
          filter:`blur(7px)`,
          scrollTrigger: {
            trigger: "#skills",
            start: `40% bottom`,
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
      className="mb-32 flex flex-col items-center pt-10 mt-2"
    >
      <div className="w-full mb-20 md:pl-16">

        <ChangingHeading mainHeading={"Skills"} subHeading={"That Matters"} />
      </div>
      <ul className="flex  flex-1 gap-8 flex-wrap justify-center">
        {skill.map(([icons, desc]) => (
          <li key={desc}  style={{ perspective: "300px" }}>
            <div className="ind  w-52 flex flex-col  items-center gap-6 origin-top ">
              <i className={`${icons}  text-[80px]  leading-none h-24`}></i>
              <p className="text-center text-sm ">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
