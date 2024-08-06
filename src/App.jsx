import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Router>
        
        <Suspense fallback={<div className='flex items-center bg-[#222] text-white justify-center text-3xl h-screen'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
    </Router>
  );
}

export default App;
