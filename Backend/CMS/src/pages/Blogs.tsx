import BlogsTable from "../components/BlogsTable";
import clsx from "clsx";
import { useNav } from "../utils/hooks";

export default function Page() {
  const {collapse, isMobile} = useNav();
  return (
    <div className={clsx("m-4 mx-10 flex flex-col justify-center transition-all duration-300",
        {"w-full mx-4!": !collapse && !isMobile}, {"w-full": collapse && !isMobile},
        {"mx-2!": isMobile}
        )}>
      <BlogsTable />
    </div>
  );
}
