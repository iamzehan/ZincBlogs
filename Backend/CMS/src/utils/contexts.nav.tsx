import {
  createContext,
  type SetStateAction,
  type Dispatch,
  type ReactNode,
  useState,
} from "react";
import { useIsMobile, useAuth } from "./hooks";
import { useLocation } from "react-router-dom";

// Context type for NavContext Provider
interface NavContextType {
  collapse: boolean;
  setCollapse: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  handleMenuShowHide: ()=> void;
  logoutUser: ()=> void;
  hideMenuMobile: ()=> void;
  location: {pathname: string};
}

// Prop Type for NavProvider
interface NavProviderProps {
  children: ReactNode;
}

// Creating the Navigation Context
const NavContext = createContext<NavContextType | undefined>(undefined);

// Navigation Provider (this will wrap our side bar)
export const NavProvider = ({ children }: NavProviderProps) => {
//   This hook detects mobile device
  const isMobile = useIsMobile();
//   This state handles menu collapse 
  const [collapse, setCollapse] = useState<boolean>(isMobile? true: false);
//   This is the logout function taken from Auth Context provider
  const {logout} = useAuth();
// This detects the current location of the user (used to style active state in links) 
  const location = useLocation();

//   This function handles hiding and showing menu
  const handleMenuShowHide = () => {
    setCollapse((prev) => !prev);
  };

  // Logout user handles logout request and redirects user to login page immediately
  const logoutUser = async () => {
    try {
      await logout(); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  
  // In mobile devices clicking link would hide the menu
  const hideMenuMobile = () => {
    if (isMobile) {
      handleMenuShowHide();
    } else {
      return;
    }
  };

//   Context values 
  const value: NavContextType = {
    collapse,
    setCollapse,
    isMobile,
    handleMenuShowHide,
    logoutUser,
    hideMenuMobile,
    location
  };
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContext;