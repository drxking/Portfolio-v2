// src/App.jsx
import { Suspense, lazy, createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { DarkMode, LightMode } from "./utils/mode";
const Home = lazy(() => import("./pages/Home"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Blog = lazy(() => import("./pages/Blog"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const Edit = lazy(() => import("./pages/Edit"));
const Create = lazy(() => import("./pages/Create"));

export const ThemeContext = createContext(false);
const App = () => {
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }, []);

  const changedTheme = (data) => {
    setTheme(data);
  };

  useEffect(() => {
    if (theme) {
      DarkMode();
    } else {
      LightMode();
    }
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ changedTheme, theme }}>
        <Router>
          <Suspense
            fallback={
              <div className="h-[100vh] fixed top-0 left-0 w-full flex items-center justify-center bg-[#222]">
                <MutatingDots
                  visible={true}
                  height="100"
                  width="100"
                  color="#e5e5e5"
                  secondaryColor="#e5e5e5"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
