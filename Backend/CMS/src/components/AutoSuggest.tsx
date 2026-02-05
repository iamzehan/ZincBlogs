import { useState, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function AutoSuggest({
  options = [],
  selected = [],
  setSelected,
}: {
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [input, setInput] = useState("");

  const filteredOptions = useMemo(() => {
    if (!input) return [];
    return options.filter(
      (opt) =>
        opt.toLowerCase().includes(input.toLowerCase()) &&
        !selected.includes(opt),
    );
  }, [input, options, selected]);

  const addOption = (option: string) => {
    setSelected((prev:string[]) => [...prev, option]);
    setInput("");
  };

  const removeOption = (option: string) => {
    setSelected((prev:string[]) => prev.filter((o) => o !== option));
  };

  return (
    <div className="w-full relative *:text-sm *:md:text-normal text-zinc-200 text-left">
      {/* Label */}
      <label className="mb-1 block text-zinc-400 font-semibold">Enter tags</label>

      {/* Input container */}
      <div className="md:p-2 text-xl md:text-base flex flex-wrap items-center gap-1 rounded-md border border-zinc-600 p-1 focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-500/40">
        {selected.map((option) => (
          <span
            key={option}
            className="flex items-center gap-2 rounded bg-blue-600/50 pl-4 pr-2 py-1 text-blue-200"
          >
            {option}
            <button
              type="button"
              onClick={() => removeOption(option)}
              className="text-blue-400 hover:text-zinc-200"
            >
              <CloseIcon sx={{ fontSize: 14 }} className="mb-0.5"/>
            </button>
          </span>
        ))}

        <input
          name="tags"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={(e) =>
            e.target.value.trim() !== ""
              ? addOption(e.target.value.trim())
              : null
          }
          onKeyDown={(e) => {
            const trimmed = input.trim();

            // Add tag on Enter or Space
            if ((e.key === "Enter" || e.key === " ") && trimmed !== "") {
              e.preventDefault();
              if (!selected.includes(trimmed)) addOption(trimmed);
              return;
            }

            // Backspace: edit last tag if input is empty
            if (
              e.key === "Backspace" &&
              trimmed === "" &&
              selected.length > 0
            ) {
              e.preventDefault();
              const last = selected[selected.length - 1];
              removeOption(last); // remove from selected
              setInput(last); // put it back in input
            }
          }}
          className="bg-transparent rounded px-2 py-1 text-zinc-200 outline-none placeholder:text-zinc-500"
          placeholder="Add tags..."
        />
      </div>

      {/* Suggestions */}
      {filteredOptions.length > 0 && (
        <ul className="mt-1 max-h-48 overflow-auto absolute w-full z-40 rounded-md border border-zinc-800 bg-zinc-900 shadow-lg">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onMouseDown={() => addOption(option)}
              className="cursor-pointer px-3 py-2 hover:bg-zinc-800"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
