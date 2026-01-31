import type { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  type: string;
  additionalDesign?: string | null;
  fn: () => void;
}

export default function Button({
  props,
  children,
}: {
  props: ButtonProps;
  children: ReactNode;
}) {
  const { type, additionalDesign, fn } = props;
  if (type === "primary") {
    return (
      <button
        onClick={fn}
        className={clsx(
          `bg-zinc-50 *:text-zinc-900 transition all duration-300
                hover:*:text-zinc-50 hover:bg-zinc-900 inline-flex gap-2 place-items-center p-3
                active:scale-95 active:bg-zinc-400/50`,
          additionalDesign,
        )}
      >
        {children}
      </button>
    );
  }
}
