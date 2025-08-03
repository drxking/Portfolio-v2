import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChangingHeading from "./ChangingHeading";
gsap.registerPlugin(ScrollTrigger);

const skill = Object.entries({
  "Node.js.svg":
    "Node JS",
  "React.svg":
    "React",
  "Tailwind.svg":
    "Tailwind CSS",
  "Linux.svg":
    "Linux",
  "Git.svg":
    "Git",
  "Express.svg":
    "Express",
  "MongoDB.svg":
    "Mongo DB",
  "Mongoose.js.svg":
    "Mongoose JS",
  "Gsap.svg":
    "GSAP"

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
          filter: `blur(7px)`,
          scrollTrigger: {
            trigger: yy,
            start: "top bottom",
            end: "top 80%",
            scrub: 1
          },
        });
      });
    } else {
      // let tt = refff.current.querySelectorAll(".ind");
      gsap.from(".ind", {
        opacity: 0,
        duration: 1.5,
        stagger: 0.07,
        filter: `blur(7px)`,
        scrollTrigger: {
          trigger: "#skills",
          start: `40% bottom`,
          end: "bottom 70%",
          // markers:true,
          scrub: 1
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
      <div className="w-full mb-20 ">

        <ChangingHeading mainHeading={"Skills"} subHeading={"That Matters"} />
      </div>
      <ul className="flex  flex-1 gap-8 gap-y-20 flex-wrap justify-center">
        {skill.map(([icons, desc]) => (
          <li key={desc} style={{ perspective: "300px" }}>
            <div className="ind  md:w-48 w-64 flex flex-col  items-center gap-6 origin-top ">
              <img src={`/skillsIcons/${icons}`} className="h-20" />
              <p className="text-center font-medium text-sm uppercase">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
