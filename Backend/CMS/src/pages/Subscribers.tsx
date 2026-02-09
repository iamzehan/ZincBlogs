import SubsTable from "../components/SubscribersTable";
import clsx from "clsx";
import { useNav } from "../utils/hooks";
import { SubsProvider } from "../utils/contexts.subs";

export default function Page() {
  const { collapse, isMobile } = useNav();
  return (
    <SubsProvider>
      <div
        className={clsx(
          "relative m-4 md:ml-20 xl:ml-10 flex flex-col gap-2 items-center transition-all duration-300",
          { "xl:w-[80vw] w-full lg:w-[90%] ml-10!": !collapse && !isMobile },
          { "w-full lg:w-[90%] md:w-[90%] xl:w-[95vw]": collapse && !isMobile },
          { "mx-2!": isMobile },
        )}
      >
        <SubsTable />
      </div>
    </SubsProvider>
  );
}
