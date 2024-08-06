import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Respo from "../components/Respo";
import Skills from "../components/Skills";
import { useEffect, useState } from "react";
import Projects from "../components/Projects";
import { DarkMode, LightMode } from "../utils/mode";

const Home = () => {
  const [theme, setTheme] = useState(true);
  const [data, setData] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      DarkMode();
      setTheme(true);
      setData(true);
    }
  }, []);
  useEffect(() => {
    if (theme) {
      DarkMode();
      setData(true);
    } else {
      LightMode();
      setData(false);
    }
  }, [theme]);
  function handleTheme(data) {
    if (data) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }
  return (
    <div className="lg:px-20 md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
      <Respo />
      <Navbar isDarkMode={handleTheme} theme={data} />
      <Hero onImageLoad={handleImageLoad} />
      {isImageLoaded && <Skills />}
      {isImageLoaded && <Projects />}
    </div>
  );
};

export default Home;
