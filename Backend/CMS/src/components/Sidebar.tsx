import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Menu, Close } from '@mui/icons-material'
import { links } from "../utils/links";
import clsx from 'clsx';

export default function SideBar() {
  const [collapse, setCollapse] = useState<boolean>(true);

  const handleMenu = () => {
        setCollapse((prev)=> !prev);
    }
  return (
    <header className="relative">
      <aside className={
        clsx("w-full md:w-[300px] bg-zinc-800/50 backdrop-blur-xl  md:bg-zinc-800 h-full z-100 origin-left transition-all duration-300 fixed left-0 flex flex-col",
        { "-translate-x-full": collapse}
        
      )}>
        {/* Brand Logo */}
        <div className="font-bold text-2xl border-b p-5 text-left">Blog Admin Panel</div>
        <NavLinks props={{handleMenu}}/>
      </aside>
      <MenuButton props={{collapse, handleMenu}}/>
    </header>
  );
}

// Nav links are mapped here
function NavLinks({props} : { props: {handleMenu: ()=> void}}) {
    const location = useLocation();
    const {handleMenu} = props
    return (
        <ul className="
        text-white flex flex-col 
        h-full justify-start 
        py-5 gap-2 *:transition-all *:duration-300 
        [&>li]:last-of-type:text-red-500 [&>li]:last-of-type:hover:bg-red-200/20 
        [&>li]:last-of-type:fixed [&>li]:last-of-type:bottom-10 [&>li]:last-of-type:w-[280px]
        ">
            {links.map((link, idx)=> {
                const Icon = link.icon;
                return <li 
                key={idx}
                onClick={handleMenu}
                className={
                    clsx(
                        "text-2xl md:text-xl flex items-center rounded mx-2 p-2 px-10 gap-2 text-left",
                        {"bg-zinc-200 text-zinc-800": location.pathname==link.path},
                        {"hover:bg-zinc-400 hover:text-zinc-100": location.pathname!==link.path})}>
                    
                    <Icon fontSize="small"/>
                    <Link className="mb-0.5 flex-1 h-full" to={link.path}>{link.name}</Link>
                    </li>
            })}
            
        </ul>
    )
}


function MenuButton({props}: {
    props: {
        collapse:boolean;
        handleMenu:()=> void; 
    }}){
    
    const {collapse, handleMenu} = props;
    return (
    <>
        <button className={clsx("bg-zinc-600 active:scale-95 hover:bg-zinc-600/50 shadow-2xs fixed z-1000 top-4 transition-all duration-300 rounded-full aspect-square flex p-2", 
            {"right-2 left-auto md:left-[250px] md:right-auto": !collapse},
            {"left-2 right-auto": collapse}
        )} onClick={handleMenu}>
            {(collapse)? <Menu fontSize="medium"/>: <Close fontSize="medium"/>}
        </button>
    </>
)
}