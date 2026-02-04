import clsx from "clsx";
import { links } from "../utils/links";
import {  useNav } from "../utils/hooks";
import { Link } from "react-router-dom";
import { Menu, Close, Logout } from "@mui/icons-material";
import Brand from "./Brand";
export default function SideBar() {
  const {collapse} = useNav();
  return (
    <header className="relative">
      <aside
        className={clsx(
          "w-full md:w-[300px] bg-zinc-800 h-full z-100 origin-left transition-all duration-300 fixed left-0 flex flex-col",
          { "-translate-x-full": collapse },
        )}
      >
        {/* Brand Logo */}
        <div className="border-b text-2xl border-zinc-100/10 p-5 text-left">
          <Brand direction="relative flex-row border-b-0!" imgStyles="h-10 w-10 aspect-square">
          <span className="bottom-0 right-15 md:right-2 md:-bottom-3.5 absolute h-fit items-center py-0.5 text-[12px] md:text-[10px] text-green-400 border border-green-400 rounded-full px-2">Admin</span>
          </Brand>
        </div>
        <NavLinks/>
      </aside>
      <MenuButton />
    </header>
  );
}

// Nav links are mapped here
function NavLinks() {
  const {hideMenuMobile, location, logoutUser} = useNav();
  return (
    <ul
      className="
        text-white flex flex-col
        h-full justify-start 
        py-5 gap-2 *:transition-all *:duration-300 
        [&>li]:last-of-type:text-red-500 [&>li]:last-of-type:hover:bg-red-200/20 
        [&>li]:last-of-type:fixed [&>li]:last-of-type:bottom-10
        "
    >
      {links.map((link, idx) => {
        const Icon = link.icon;
        return (
          <li
            key={idx}
            onClick={() => hideMenuMobile()}
            className={clsx(
              "text-2xl md:text-xl flex items-center rounded-lg mx-2 gap-2 text-left",
              {
                "bg-zinc-200/25 text-zinc-200": location.pathname == link.path,
              },
              {
                "hover:bg-zinc-400/20 hover:text-zinc-100":
                  location.pathname !== link.path,
              },
            )}
          >
            <Icon fontSize="small"  className="ml-5"/>
            <Link className="mb-0.5 flex-1 h-full py-2" to={link.path}>
              {link.name}
            </Link>
          </li>
        );
      })}
      <li key="logout" className="mx-2 p-2 rounded-lg w-[90vw] self-center md:w-[280px]">
        <button
          type="button"
          onClick={()=>logoutUser()}
          className="h-full w-full flex justify-center items-center gap-2"
        >
          <p className="mb-0.5 h-full text-xl">Logout</p>
          <Logout fontSize="small" />
        </button>
      </li>
    </ul>
  );
}

function MenuButton() {
  const { collapse, handleMenuShowHide } = useNav();
  return (
    <>
      <button
        className={clsx(
          "bg-zinc-600 active:scale-95 hover:bg-zinc-600/50 shadow-2xs fixed z-1000 top-3 transition-all duration-300 rounded-full aspect-square flex",
          {
            "right-2 left-auto md:left-[260px] md:right-auto p-1 top-5!":
              !collapse,
          },
          { "left-2 right-auto p-3": collapse },
        )}
        onClick={handleMenuShowHide}
      >
        {collapse ? <Menu fontSize="medium" /> : <Close fontSize="medium" />}
      </button>
    </>
  );
}
