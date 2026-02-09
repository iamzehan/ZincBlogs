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
    throw new Error ("useNav must be used inside NavProvider")
  }
  return ctx;
}

// Blog Page Provider hook
import BlogContext from './contexts.blog';
export const useBlog = () => {
  const ctx = useContext(BlogContext);
  if(!ctx) throw new Error("useBlog must be used inside BlogPage");
  return ctx;
}

// Subscribers Page Provider hook
import SubsContext from './contexts.subs';
export const useSubs = () => {
  const ctx = useContext(SubsContext);
  if(!ctx) throw new Error("useSubs must be used inside Subscribers Page");
  return ctx;
}