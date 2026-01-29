import BlogsTable from "../components/BlogsTable";
import clsx from "clsx";
import { useNav } from "../utils/hooks";

export default function Page() {
  const {collapse, isMobile} = useNav();
  return (
    <div className={clsx("m-4 mx-10 flex flex-col justify-center transition-all duration-300",
        {"xl:w-[80vw] w-full lg:w-[90%] mx-4!": !collapse && !isMobile}, 
        {"w-full lg:w-[90%] md:w-[90%] xl:w-[95vw]": collapse && !isMobile},
        {"mx-2!": isMobile}
        )}>
      <BlogsTable />
    </div>
  );
}
