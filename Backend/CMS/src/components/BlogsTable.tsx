"use client";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useBlog, useIsMobile } from "../utils/hooks";
import { fetchAllBlogs } from "../utils/requests.blog";
import { formatPostDate } from "../utils/formatter.data";
import { SkeletonBlogsTable } from "./skeletons";
import { PublishPills } from "./PublishPills";
import { Error, EditSquare  } from "@mui/icons-material";

export default function BlogsTable() {
  const { accessToken } = useAuth();
  const { fetchWithAuth } = useBlog();
  const isMobile = useIsMobile();
  const { isPending, error, data } = useQuery({
    queryKey: ["blogData"],
    queryFn: () => fetchWithAuth(fetchAllBlogs, { accessToken }),
    enabled: !!accessToken,
  });

  if (isPending) return <SkeletonBlogsTable />;
  if (error)
    return (
      <div className="h-50 place-content-center text-xl text-red-500 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 transition-all duration-300 w-full">
        Error loading blogs <Error />
      </div>
    );
  return (
    <>
      <div
        className={clsx(
          "overflow-x-auto rounded-md border-zinc-600 transition-all duration-300 w-full",
          { "bg-zinc-950 border": !isMobile },
        )}
      >
        <table className="w-full border-collapse">
          {/* Table Head - hide on mobile */}
          <thead className={isMobile ? "hidden" : ""}>
            <tr className="bg-zinc-900 text-zinc-300">
              <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium truncate text-ellipsis">
                Date Created
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium">
                Publish Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Array.isArray(data) &&
              data.map((blog: Blog) => (
                <tr
                  key={blog.id}
                  className={clsx(
                    "border-t border-zinc-800 hover:bg-zinc-900/60 transition-colors",
                    isMobile
                      ? "flex flex-col mb-4 bg-zinc-900/50 rounded-md p-4"
                      : "table-row",
                  )}
                >
                  {/* Title */}
                  <td
                    className={clsx(
                      "text-left text-zinc-100 underline-offset-2 hover:text-blue-400 hover:underline",
                      isMobile ? "flex " : "",
                    )}
                  >
                    {isMobile && (
                      <span className="font-medium mr-2">Title:</span>
                    )}

                    <Link
                      to={`/blog/posts/${blog.id}`}
                      className={isMobile? "truncate max-w-[250px] block": "inline-flex justify-center px-4"} // <-- truncate on the Link itself
                      title={blog.title} // optional: full text on hover
                    >
                      {blog.title}
                    </Link>
                  </td>

                  {/* Date Created */}
                  <td
                    className={clsx(
                      "text-left text-zinc-100",
                      isMobile ? "flex justify-between items-center" : "",
                    )}
                  >
                    {isMobile && <span className="font-medium">Date:</span>}
                    <Link
                      to={`/blog/posts/${blog.id}`}
                      className="px-4 py-3 inline-flex w-full"
                    >
                      {formatPostDate(blog.createdAt)}
                    </Link>
                  </td>

                  {/* Publish Status */}
                  <td
                    className={clsx(
                      isMobile
                        ? "flex justify-between items-center gap-2 h-10"
                        : "table-cell",
                    )}
                  >
                    {isMobile && 
                    
                    // Edit button
                    <Link
                      to={`/blog/posts/${blog.id}`}
                      className="h-full bg-white text-zinc-600 font-semibold inline-flex 
                      w-full border rounded-md items-center justify-center gap-2 
                      active:scale-95 transition-all duration-300"
                    >
                      Edit <EditSquare className="text-zinc-600 text-lg!"/>
                    </Link>
                    }
                    {/* Publish Button */}
                    <PublishPills key={blog.id} props={blog} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
