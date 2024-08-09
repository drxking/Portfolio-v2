// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
const Home = lazy(() => import("./pages/Home"));
const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-[#222]">
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
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
