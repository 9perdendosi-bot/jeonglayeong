
import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';

const NavItem = memo(({ label, onClick, className = "" }: { 
  label: string; 
  onClick?: () => void;
  className?: string;
}) => (
  <button 
    onClick={onClick}
    className={`text-base font-bold uppercase hover:opacity-50 transition-opacity tracking-widest ${className}`}
  >
    {label}
  </button>
));

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuView, setMobileMenuView] = useState<'main' | 'project' | 'shop'>('main');
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Route change -> Close menu and reset view
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileMenuView('main');
  }, [location]);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth >= 768) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setIsProjectHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth >= 768) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsProjectHovered(false);
      }, 150);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) setMobileMenuView('main'); // Reset to main when opening
  };

  const handleProjectClick = () => {
    if (window.innerWidth < 768) {
      setMobileMenuView('project');
    }
  };

  const handleShopClick = () => {
    if (window.innerWidth < 768) {
      setMobileMenuView('shop');
    }
  };

  const closeProjectOverlay = useCallback(() => setIsProjectHovered(false), []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isProjectHovered ? 'bg-transparent' : 'bg-white'}`}>
        <div className="w-full px-[1.5rem] md:px-[3rem] h-16 flex items-center justify-between relative z-50">
          <Link to="/" className="text-base font-bold uppercase tracking-tighter">
            JEONGLAYEONG
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12 h-full items-center">
            <div 
              className="h-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavItem label="Project" />
            </div>
            <Link to="/info" className="text-base font-bold uppercase hover:opacity-50 transition-opacity">Info</Link>
            <Link to="/contact" className="text-base font-bold uppercase hover:opacity-50 transition-opacity">Contact</Link>
          </div>

          {/* Mobile Menu Toggle - Icon replaced with custom image */}
          <button 
            className="md:hidden z-[60] p-1 transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X size={28} className="text-black" />
            ) : (
              <img 
                src="https://i.imgur.com/mVO2hcK.png" 
                alt="Menu" 
                className="w-7 h-auto block object-contain"
                style={{ filter: 'brightness(0)' }} // Ensures it looks solid black
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-white transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full w-full px-10 relative">
          
          {mobileMenuView === 'main' ? (
            /* Main Menu View */
            <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Link to="/" className="text-base font-bold uppercase tracking-widest">Home</Link>
              <NavItem label="Project" onClick={handleProjectClick} />
              <Link to="/info" className="text-base font-bold uppercase tracking-widest">Info</Link>
              <Link to="/contact" className="text-base font-bold uppercase tracking-widest">Contact</Link>
              <NavItem label="Shop" onClick={handleShopClick} />
            </div>
          ) : mobileMenuView === 'project' ? (
            /* Project Sub-menu View */
            <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-right-4 duration-500 w-full">
              <button 
                onClick={() => setMobileMenuView('main')}
                className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 hover:text-black transition-colors"
              >
                <ArrowLeft size={12} /> BACK
              </button>
              
              <div className="w-full flex flex-col items-center gap-8">
                <Link 
                  to="/facing-the-divided-a" 
                  className="text-base font-bold tracking-widest text-center px-4 hover:opacity-50 transition-opacity"
                >
                  Facing the divided a
                </Link>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] cursor-default mt-4">
                  MORE COMING SOON
                </span>
              </div>
            </div>
          ) : (
            /* Shop Sub-menu View */
            <div className="flex flex-col items-center justify-between h-full w-full py-24 animate-in fade-in slide-in-from-right-4 duration-500">
               <button 
                onClick={() => setMobileMenuView('main')}
                className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-black transition-colors"
              >
                <ArrowLeft size={12} /> BACK
              </button>

              <div className="flex-grow flex items-center justify-center">
                <p className="text-xl md:text-2xl font-bold tracking-[0.3em] text-black opacity-15 select-none uppercase">
                  open 26.02.10.
                </p>
              </div>

              <div className="h-4" /> {/* Spacer */}
            </div>
          )}

        </div>
      </div>

      {/* Desktop Project Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-white/85 backdrop-blur-md transition-opacity duration-500 ease-in-out will-change-[backdrop-filter,opacity] ${isProjectHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full px-[1.5rem] md:px-[3rem] pt-[8rem] md:pt-[10rem]">
           <Link 
             to="/facing-the-divided-a"
             onClick={closeProjectOverlay}
             className={`block font-medium text-gray-500 hover:text-black transition-all duration-700 ease-out transform will-change-transform text-[clamp(1.8rem,4vw,3rem)] ${isProjectHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
           >
             Facing the divided a
           </Link>
        </div>
      </div>
    </>
  );
}
