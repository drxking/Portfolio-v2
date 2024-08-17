import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import { useState } from "react";
import Projects from "../components/Projects";
import Respo from "../components/Respo";

const Home = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="lg:px-20 md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
      <Navbar />
      <Respo
        list={{
          Skills: "#skills",
          Projects: "#projects",
          Contact: "#",
          Blogs: "/blogs",
        }}
      />
      <Hero onImageLoad={handleImageLoad} />
      {isImageLoaded && <Skills />}
      {isImageLoaded && <Projects />}
    </div>
  );
};

export default Home;
