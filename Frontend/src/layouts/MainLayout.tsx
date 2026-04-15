import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

import LoginPromptDialog from "../components/LoginRequired";
import Footer from "../components/Footer";
import { useAuth } from "../utils/hooks";

export default function HomeLayout() {
  const { loginPrompt, setLoginPrompt } = useAuth();
  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="flex">
        <Outlet />
        <LoginPromptDialog open={loginPrompt} setOpen={setLoginPrompt} />
      </div>
      <Footer/>
    </div>
  );
}
