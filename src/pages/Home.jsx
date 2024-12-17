import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import { useState } from "react";
import Projects from "../components/Projects";
import Respo from "../components/Respo";
import { Helmet } from "react-helmet";
import Form from "../components/Form";

const Home = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="lg:px-20 md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
      <Helmet>
        <title>
          Sudip Acharya
        </title>
      </Helmet>
      <Navbar />
      <Respo
        list={{
          Skills: "#skills",
          Projects: "#projects",
          Contact: "#contact",
          Blogs: "/blogs",
        }}
      />
      <Hero onImageLoad={handleImageLoad} />
      {isImageLoaded && <Skills />}
      {isImageLoaded && <Projects />}
      {isImageLoaded && <Form />}
    </div>
  );
};

export default Home;
