import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import { NavProvider } from "../utils/contexts.nav";

export default function MainLayout() {
  return (
    <div className="container flex p-0 h-screen w-screen">
      <TopBar />
      <NavProvider>
        <SideBar />
      </NavProvider>
      <main className="flex-1 bg-zinc-700 w-full mt-20">
        <Outlet />
      </main>
    </div>
  );
}