import { useAuth, useIsMobile, useSubs } from "../utils/hooks";
import { useQuery } from "@tanstack/react-query";
import { SkeletonBlogsTable } from "./skeletons";
import { Error } from "@mui/icons-material";
import { fetchAllSubscribers } from "../utils/requests.subs";
import { useState } from "react";
import clsx from "clsx";
import { ContentCopy, Done } from "@mui/icons-material";

export default function UsersTable() {
  const { fetchWithAuth } = useSubs();
  const { accessToken } = useAuth();
  const isMobile = useIsMobile();

  const { isPending, error, data } = useQuery({
    queryKey: ["blogData"],
    queryFn: () => fetchWithAuth(fetchAllSubscribers, { accessToken }),
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
    <div className={clsx("overflow-x-auto rounded-md border-zinc-600 transition-all duration-300 w-full",
      {"bg-zinc-950 border": !isMobile}
    )}>
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead className={isMobile ? "hidden" : ""}>
          <tr className="bg-zinc-900 text-zinc-300">
            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Username
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium truncate text-ellipsis">
              Email
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium">
              Verified
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Join Date
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {Array.isArray(data) &&
            data.map((subscriber: Subscriber) => (
              <tr
                key={subscriber.email}
                className={`
                border-t border-zinc-800 hover:bg-zinc-900/60 transition-colors
                ${isMobile ? "flex flex-col mb-4 bg-zinc-900/50 rounded-md p-4" : "table-row"}
              `}
              >
                {/* Name */}
                <td
                  className={`px-4 py-3 text-zinc-100 text-sm md:text-base ${
                    isMobile ? "flex justify-between" : "text-left"
                  }`}
                >
                  {isMobile && <span className="font-medium">Name:</span>}
                  <span>
                    {subscriber.firstName} {subscriber.lastName}
                  </span>
                </td>

                {/* Username */}
                <td
                  className={`px-4 py-3 text-zinc-100 text-sm ${
                    isMobile ? "flex justify-between" : "text-left"
                  }`}
                >
                  {isMobile && <span className="font-medium">Username:</span>}
                  <span>@{subscriber.username}</span>
                </td>

                {/* Email */}
                <td
                  className={`px-4 py-3 text-zinc-100 text-xs md:text-sm ${
                    isMobile ? "flex justify-between" : "text-left"
                  }`}
                >
                  {isMobile && <span className="font-medium">Email:</span>}
                  <EmailCopy key={subscriber.email} subscriber={subscriber} />
                </td>

                {/* Verified */}
                <td
                  className={`px-4 py-3 text-center ${
                    isMobile ? "flex justify-between" : "table-cell"
                  }`}
                >
                  {isMobile && <span className="font-medium">Verified:</span>}
                  <span
                    className={`px-2 py-1 flex w-20 justify-center rounded-full text-xs font-medium ${
                      subscriber.isVarified
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {subscriber.isVarified ? "Verified" : "Unverified"}
                  </span>
                </td>

                {/* Join Date */}
                <td
                  className={`px-4 py-3 text-zinc-100 text-xs ${
                    isMobile ? "flex justify-between" : "text-left"
                  }`}
                >
                  {isMobile && <span className="font-medium">Join Date:</span>}
                  <span>
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

const EmailCopy = ({ subscriber }: { subscriber: Subscriber }) => {
  const [isCopied, setCopy] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setTimeout(() => setCopy(false), 800);
    setCopy(true);
  };
  return (
    <button
      type="button"
      onClick={() => handleCopy(subscriber.email)}
      className="group inline-flex items-center gap-2 hover:text-blue-400 transition-colors"
      title="Click to copy"
    >
      <span className="truncate">{subscriber.email}</span>

      <span
        key={subscriber.email}
        className={clsx(
          "text-zinc-500 group-hover:opacity-100 transition-opacity text-xs",
          { "opacity-0": !isCopied },
          { "opacity-100": isCopied || isMobile },
        )}
      >
        {isCopied ? (
          <Done className="text-xs!" />
        ) : (
          <ContentCopy className="text-xs!" />
        )}
      </span>
    </button>
  );
};
