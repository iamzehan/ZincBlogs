"use client"
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useBlog } from "../utils/hooks";
import { fetchAllBlogs } from "../utils/requests.blog";
import { formatPostDate } from "../utils/formatter.data";
import { SkeletonBlogsTable } from "./skeletons";
import { PublishPills } from "./PublishPills";

export default function BlogsTable() {
  const { accessToken } = useAuth();
  const {fetchWithAuth} = useBlog();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["blogData"],
    queryFn: () => fetchWithAuth(fetchAllBlogs, {accessToken}),
    enabled: !!accessToken, // wait for token
  });
  if (isPending)
    return (
        <SkeletonBlogsTable />
    );
  if (error) return <p>Error loading blogs</p>;
  if (isFetching)
    return (
        <SkeletonBlogsTable />
    );
  return (
    <>
      <div
        className={clsx(
          "overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 transition-all duration-300 w-full",
        )}
      >
        <table className="w-full border-collapse">
          <thead>
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

          <tbody>
            {Array.isArray(data) && data.map((blog: Blog) => (
              <tr
                key={blog.id}
                className="border-t border-zinc-800 hover:bg-zinc-900/60 transition-colors"
              >
                <td className="text-left text-zinc-100 max-w-fit underline-offset-2 hover:text-blue-400 hover:underline">
                  <Link
                    to={`/blog/posts/${blog.id}`}
                    className="px-4 py-3 inline-flex text-sm md:text-base"
                  >
                    {blog.title}
                  </Link>
                </td>

                <td className="text-left text-xs text-zinc-100">
                  <Link
                    to={`/blog/posts/${blog.id}`}
                    className="px-4 py-3 inline-flex w-full"
                  >
                    {formatPostDate(blog.createdAt)}
                  </Link>
                </td>

                <td>
                  <Link
                    to={`/blog/posts/${blog.id}`}
                    className="px-4 py-3 w-full"
                  >
                    <PublishPills props={blog} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
