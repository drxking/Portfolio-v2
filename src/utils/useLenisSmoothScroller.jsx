import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useLenisSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            //   duration: 1.2, // Adjust smoothness
            //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            smooth: true,
            lerp: 0.07
        });

        const updateScroll = (time) => {
            lenis.raf(time);
            ScrollTrigger.update(); // Sync GSAP
            requestAnimationFrame(updateScroll);
        };

        requestAnimationFrame(updateScroll);

        return () => {
            lenis.destroy(); // Cleanup on unmount
        };
    }, []);
};

export default useLenisSmoothScroll;
