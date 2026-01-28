import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Close, Logout } from "@mui/icons-material";
import { links } from "../utils/links";
import clsx from "clsx";
import { useIsMobile, useAuth } from "../utils/hooks";

export default function SideBar() {
  //   Mobile device behaviour
  const isMobile = useIsMobile();
  const [collapse, setCollapse] = useState<boolean>(isMobile ? true : false);

  const handleMenuHide = () => {
    setCollapse((prev) => !prev);
  };
  return (
    <header className="relative">
      <aside
        className={clsx(
          "w-full md:w-[300px] bg-zinc-800 h-full z-100 origin-left transition-all duration-300 fixed left-0 flex flex-col",
          { "-translate-x-full": collapse },
        )}
      >
        {/* Brand Logo */}
        <div className="font-bold text-2xl border-b border-zinc-100/10 p-5 text-left">
          Blog Admin Panel
        </div>
        <NavLinks props={{ handleMenuHide }} />
      </aside>
      <MenuButton props={{ collapse, handleMenuHide }} />
    </header>
  );
}

// Nav links are mapped here
function NavLinks({ props }: { props: { handleMenuHide: () => void } }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { handleMenuHide } = props;

  // Logout
  const logoutUser = async () => {
    try {
      await logout(); 
      navigate("/login"); // redirect after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // In mobile devices clicking link would hide the menu
  const hideMenu = () => {
    if (isMobile) {
      handleMenuHide();
    } else {
      return;
    }
  };
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
            onClick={() => hideMenu()}
            className={clsx(
              "text-2xl md:text-xl flex items-center rounded-lg mx-2 py-2 px-5 gap-2 text-left",
              {
                "bg-zinc-200/30 text-zinc-100": location.pathname == link.path,
              },
              {
                "hover:bg-zinc-400/20 hover:text-zinc-100":
                  location.pathname !== link.path,
              },
            )}
          >
            <Icon fontSize="small" />
            <Link className="mb-0.5 flex-1 h-full" to={link.path}>
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

function MenuButton({
  props,
}: {
  props: {
    collapse: boolean;
    handleMenuHide: () => void;
  };
}) {
  const { collapse, handleMenuHide } = props;
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
        onClick={handleMenuHide}
      >
        {collapse ? <Menu fontSize="medium" /> : <Close fontSize="medium" />}
      </button>
    </>
  );
}
