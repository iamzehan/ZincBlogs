import { links } from "../utils/links";
import { useAuth, useIsMobile, useNav } from "../utils/hooks";
import { useEffect, useState } from "react";
import { Person } from "@mui/icons-material";
import clsx from "clsx";
export default function TopBar() {
  return (
    <>
      <div
        className="
            flex justify-between items-center
            w-full text-white text-2xl font-bold 
            bg-zinc-900 fixed top-0 left-0 px-2 h-18 text-right z-80"
      >
        <PageHeader />
        <UserBadge />
      </div>
    </>
  );
}

// Page header 
function PageHeader() {
  const isMobile = useIsMobile();
  const { collapse, location, customHeader } = useNav();
  const currentLink = links.find((link) => link.path === location.pathname);
  const [heading, setHeading] = useState(currentLink?.name || customHeader);

  useEffect(() => {
    const currentLink = links.find((link) => link.path === location.pathname);
    const headingHandler = async () => {
      setHeading(currentLink?.name || customHeader);
    };
    headingHandler();
  }, [location]);

  return (
    <div
      className={clsx(
        "text-xl transition-all duration-300",
        { "ml-10": isMobile },
        { "ml-[300px]": !collapse && !isMobile },
        { "ml-15": collapse },
      )}
    >
      {heading}
    </div>
  );
}

// Logged in user badge
function UserBadge() {
  const { user } = useAuth();
  return (
    <div className="text-sm flex items-center gap-2 px-4 py-2 ">
      <span className="flex aspect-square p-1 rounded-full bg-white border">
        <Person fontSize="small" className="text-zinc-500"/>
      </span>
      {user?.username}
    </div>
  );
}
