import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsProjectsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProjectsHovered(false);
    }, 150);
  };

  const NavLink = ({ to, label, isProjectTrigger }: { to?: string; label: string; isProjectTrigger?: boolean }) => (
    <div 
      className="h-full flex items-center"
      onMouseEnter={() => isProjectTrigger && handleMouseEnter()}
      onMouseLeave={() => isProjectTrigger && handleMouseLeave()}
    >
      {to ? (
        <Link
          to={to}
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-base font-bold uppercase hover:opacity-50 transition-opacity"
        >
          {label}
        </Link>
      ) : (
        <span className="text-base font-bold uppercase hover:opacity-50 transition-opacity cursor-default">
          {label}
        </span>
      )}
    </div>
  );

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isProjectsHovered ? 'bg-transparent' : 'bg-white'}`}
      >
        {/* Changed max-w-7xl mx-auto to w-full and adjusted padding for wider spread */}
        <div className="w-full px-6 md:px-12 h-24 flex items-center justify-between relative z-50">
          {/* Logo / Artist Name */}
          <Link to="/" className="text-base font-bold uppercase">
            JEONGLAYEONG
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12 h-full items-center">
            <NavLink label="Projects" isProjectTrigger={true} />
            <NavLink to="/info" label="Info" />
            <NavLink to="/contact" label="Contact" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold uppercase">Home</Link>
            <Link to="/facing-the-divided-a" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold uppercase">Projects</Link>
            <Link to="/info" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold uppercase">Info</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold uppercase">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Projects Hover Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-white/85 backdrop-blur-md transition-opacity duration-500 ease-in-out ${isProjectsHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Removed flex center alignment, added padding for top-left positioning */}
        <div className="w-full px-6 md:px-12 pt-32 md:pt-40">
           <Link 
             to="/facing-the-divided-a"
             onClick={() => setIsProjectsHovered(false)}
             className={`block text-3xl md:text-5xl font-medium text-gray-500 hover:text-black transition-all duration-700 ease-out transform ${isProjectsHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
           >
             Facing the divided a
           </Link>
        </div>
      </div>
    </>
  );
}