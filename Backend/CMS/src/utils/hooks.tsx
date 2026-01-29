import { useState, useEffect, useContext } from 'react';

// Mobile device detection hook
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
};

// Authentication Provider hook
import AuthContext from './contexts.auth';
export const  useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

// Sidebar Navigation Provider hook
import NavContext from './contexts.nav';
export const useNav = ()=> {
  const ctx = useContext(NavContext);
  if(!ctx) {
    throw new Error ("useContext must be used inside NavProvider")
  }
  return ctx;
}