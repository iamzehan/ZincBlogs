import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import TopBar from "../components/Topbar";

export default function MainLayout () {
    return (
        <div className="container flex p-0 h-screen w-screen">
            <TopBar/>
            <SideBar/>
            <main className="flex-1 bg-zinc-700 w-full mt-20">
                <Outlet/>
            </main>
        </div>
    )
}