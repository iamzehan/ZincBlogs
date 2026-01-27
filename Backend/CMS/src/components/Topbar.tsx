import { useLocation } from "react-router-dom";
import { links } from "../utils/links";
import { useEffect, useState } from "react";

export default function TopBar() {
    const location = useLocation();
    const currentLink = links.find(link=> link.path===location.pathname);
    const [heading, setHeading] = useState(currentLink?.name);

    useEffect(()=> {
        const currentLink = links.find(link=> link.path===location.pathname);
        const headingHandler = async () => {
            setHeading(currentLink?.name);
        }
        headingHandler();
    }, [location])
    return (
        <>
            <div className="w-full text-white text-2xl font-bold bg-zinc-900 fixed top-0 left-0 p-5 text-right z-80">{heading}</div>
        </>
    )
}