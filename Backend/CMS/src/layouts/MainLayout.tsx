import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import { NavProvider } from "../utils/contexts.nav";
import { useIsMobile, useNav } from "../utils/hooks";
import clsx from 'clsx';
export default function MainLayout() {

  return (
    <div className="container flex p-0 h-screen w-screen">
      <NavProvider>
        <TopBar />
        <SideBar />
        <OutletWrapper/>
      </NavProvider>
    </div>
  );
}

export function OutletWrapper(){
      const isMobile = useIsMobile();
  const {collapse} = useNav();
    return (
        <main className={clsx(
        "flex-1 bg-zinc-700 w-full mt-20 transition-all duration-300",
        {"flex-wrap ml-[300px]": !isMobile && !collapse})}>
        <Outlet />
      </main>
    )
}