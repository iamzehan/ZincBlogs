import BlogForm from "../components/BlogCreateForm";
import { useEffect } from "react";
import { BlogProvider } from "../utils/contexts.blog";
import { useNav } from "../utils/hooks";
import clsx from "clsx";

export default function Page() {

  const { setCustomHeader, collapse } = useNav();
  useEffect(() => {
      setCustomHeader("Create blog");
  }, []);

    return (
      <BlogProvider>
        <div
          className={clsx(
            "transition-all duration-300 md:w-screen grid place-content-center",
            { "xl:w-[calc(100vw-100px)]": collapse },
            { "xl:w-[calc(100vw-350px)] xl:ml-5!": !collapse },
          )}
        >
          {/* Form */}
          <BlogForm />
          {/* Form Ends */}
          {/* Markdown Preview */}

          {/* Markdown Preview Ends */}
        </div>
      </BlogProvider>
    );
}
