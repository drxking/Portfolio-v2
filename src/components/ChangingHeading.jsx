import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";



const ChangingHeading = ({ mainHeading, subHeading }) => {

    let compo = useRef(null);
    useGSAP(() => {
        let tl = gsap.timeline({
            repeat: -1,
        })
        tl.to(".animator1", {
            top: `-100%`,
            duration: 0.7,
            delay: 1,
            scale: 0.8,
            ease: "power2.inOut",
            filter: `blur(3px)`,
        }, "a")
        tl.to(".animator2", {
            top: `0%`,
            duration: 0.7,
            delay: 1,
            scale: 1,
            ease: "power2.inOut",
            filter: `blur(0px)`,
        }, "a")
        tl.to(".animator2", {
            top: `-100%`,
            duration: 0.7,
            delay: 1,
            scale: 0.8,
            ease: "power2.inOut",
            filter: `blur(3px)`,
        }, "b")
        tl.to(".animator3", {
            top: `0%`,
            duration: 0.7,
            delay: 1,
            scale: 1,
            ease: "power2.inOut",
            filter: `blur(0px)`,
        }, "b")
        gsap.set(".animator3", {
            scale: 0.8,
            filter: `blur(3px)`,
        })
        gsap.set(".animator1", {
            top: `0%`,
            scale: 1,
            filter: `blur(0px)`,
        })


    }, [])


    return (
        <div ref={compo} className="relative overflow-hidden w-full flex md:justify-start justify-center items-center  px-2 md:px-10 ">
            <h1 className="text-2xl md:text-3xl  w-full opacity-0 flex flex-col   font-medium uppercase font-[Oswald]   ">{mainHeading}</h1>

            <h1 className="text-2xl md:text-3xl absolute md:origin-left  animator1 top-0  font-medium uppercase font-[Oswald]   ">{mainHeading}</h1>
            <p className="text-2xl md:text-3xl blur-[3px] scale-[0.8] absolute md:origin-left animator2 top-[100%] font-medium uppercase font-[Oswald] ">
                {subHeading}
            </p>
            <h1 className="text-2xl md:text-3xl absolute md:origin-left blur-[3px] scale-80 animator3 top-[100%]  font-medium uppercase font-[Oswald]   ">{mainHeading}</h1>
        </div>
    )
}

export default ChangingHeading