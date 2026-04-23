import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../components/TopBar";

import LoginPromptDialog from "../components/LoginRequired";
import Footer from "../components/Footer";
import { useAuth, useScrollTo } from "../utils/hooks";
import { useEffect } from "react";

export default function HomeLayout() {
  const { loginPrompt, setLoginPrompt } = useAuth();
  const { targetRef, scrollToTarget } = useScrollTo();
  const location = useLocation();
  useEffect(() => scrollToTarget(), [location.pathname]);
  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="flex" ref={targetRef}>
        <Outlet />
        <LoginPromptDialog open={loginPrompt} setOpen={setLoginPrompt} />
      </div>
      <Footer />
    </div>
  );
}
