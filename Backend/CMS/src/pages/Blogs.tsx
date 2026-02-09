import BlogsTable from "../components/BlogsTable";
import clsx from "clsx";
import { useNav } from "../utils/hooks";
import { BlogProvider } from "../utils/contexts.blog";
import Button from "../components/Buttons";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function Page() {
  const { collapse, isMobile } = useNav();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/blog/posts/create");
  };
  return (
    <BlogProvider>
      <div
        className={clsx(
          "relative m-4 md:ml-20 xl:ml-10 flex flex-col gap-2 items-center transition-all duration-300",
          { "xl:w-[80vw] w-full lg:w-[90%] ml-10!": !collapse && !isMobile },
          { "w-full lg:w-[90%] md:w-[90%] xl:w-[95vw]": collapse && !isMobile },
          { "mx-2!": isMobile },
        )}
      >
        <BlogsTable key="data-table"/>
        {/* Create Blog floating Pen button */}
        <Button
          key="write-btn"
          props={{
            type: "primary",
            fn: handleClick,
            additionalDesign: `
            fixed bottom-2 z-10
            bottom-10
            self-end rounded-full md:rounded-lg`
          }}
        >
          <p className="hidden md:block text-xl px-2">Write</p>
          <Edit className="md:text-xl! text-4xl!" />
        </Button>
      </div>
    </BlogProvider>
  );
}
