import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const H1 = ({ cont, c }) => {
  return (
    <div style={{ perspective: "100px" }} className="h1-wrapper px-2">
      <h1 className="pointer-events-none h1-s text-[18vw] md:text-[10vw] lg:text-[8vw] origin-top  text-center font-['oswald'] uppercase tracking-tighter font-[500] leading-none w-fit ">
        {cont}
        {c ? <span className="font-bold ">©</span> : ""}
      </h1>
    </div>
  );
};

const Hero = ({ onImageLoad }) => {
  useGSAP(() => {
    let widtht = window.innerWidth;
    if (widtht < 768) {
      let gl = gsap.timeline({
        repeat: -1,
        repeatDelay: 4
      });
      gl.to(".swipe", {
        opacity: 1,
        duration: 0.2,
      });
      gl.to(
        ".puchar",
        {
          width: 40,
          duration: 0.5,
          delay: 0.4,
        },
        "a"
      );
      gl.to(
        ".swipe",
        {
          delay: 0.5,
          x: -100,
          duration: 0.5,
        },
        "a"
      );
      gl.to(
        ".swipe",
        {
          delay: 0.5,
          opacity: 0,
          duration: 0.2,
        },
        "b"
      );
      gl.to(
        ".puchar",
        {
          width: 0,
        },
        "b"
      );
      gl.to(".swipe", {
        x: 100,
        duration: 0,
        delay: 0.2,
      });
    }
    let tl = gsap.timeline();
    tl.from(".h1-s", {
      y: `100%`,
      scale: 0.7,
      rotateX: -30,
      rotate: 10,
      stagger: 0.05,
      delay: 0.5,
      opacity: 0,
    });
    tl.from(".details", {
      opacity: 0,
    });
    tl.from(".image", {
      x: `100%`,
      y: `70%`,
      scale: 0.6,
      rotateX: -40,
      rotateY: -40,
      rotate: -30,
      opacity: 0,
      duration: 0.5,
    });
    tl.to(".image", {
      scale: 1,
      duration: 0.4,
      ease: "Power.in",
    });
  }, []);

  return (
    <div className="flex flex-col  items-center lg:mt-20 mt-32 relative">
      <div className="swipe h-5 translate-x-[100px] w-5 opacity-0 rounded-full   bg-[--text-color] absolute  -top-20 flex justify-center items-center">
        <div className=" puchar h-full w-0 blur-[4px]  absolute left-1/2 flex items-center">
          <div
            style={{ clipPath: "polygon(0 0, 0% 100%, 100% 51%)" }}
            className="cutted bg-[--text-color] h-1/2 w-full"
          ></div>
        </div>
        <i className="ri-arrow-left-line invert"></i>
      </div>
      <div
        style={{ perspective: "100px" }}
        className="w-fit flex flex-col items-center "
      >
        <div id="hello" className="flex flex-col items-center">
          <H1 cont={"Junior"} />
          <H1 cont={"FullStack"} />
          <H1 c={true} cont={"Developer"} />
        </div>
        <div className="details flex justify-between items-center w-full  px-2">
          <div>
            <p className="leading-tight  font-semibold  md:text-xs text-[10px]">
              Currently Crafing
              <br />
              Knowledge By MySelf.
            </p>
          </div>
          <a
            href="/My Resume.pdf"
            download={"Sudip-Acharya-Resume"}
            className="text-[--text-color] md:text-xs text-[10px] font-medium bg-[--solid-color] py-2 px-4  rounded-full"
          >
            Download Resume
          </a>
        </div>
      </div>
      <div style={{ perspective: "700px" }}>
        <div className="image origin-tops scale-[0.9] md:w-96 w-full max-w-80 mt-10 overflow-hidden  rounded-3xl">
          <img
            onLoad={onImageLoad}
            src="https://res.cloudinary.com/dgcpqppcd/image/upload/v1747062833/photo_ggf8zf.jpg"
            alt="sudip acharya"
            className=" w-full shadow-xl scale-150 origin-bottom"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
