
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Info from './pages/Info';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import FacingTheDividedA from './pages/FacingTheDividedA';
import CustomCursor from './components/CustomCursor';

const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
  </div>
);

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <CustomCursor />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-16"> 
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/info" element={<Info />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/facing-the-divided-a" element={<FacingTheDividedA />} />
            </Routes>
          </Suspense>
        </main>
        
        <footer className="py-8 text-center text-xs text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} JEONGLAYEONG
        </footer>
      </div>
    </HashRouter>
  );
}
