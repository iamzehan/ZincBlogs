export default function Input({
  label,
  name,
  placeholder="",
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs text-zinc-400 font-medium text-left">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder? placeholder :name}
        defaultValue=""
        required
        className="
          px-3 py-2 rounded-lg 
          bg-zinc-800/80 border border-zinc-700
          text-sm text-zinc-100
          focus:outline-none focus:ring-2 focus:ring-zinc-500/40
          placeholder:text-zinc-500
          transition-all
        "
      />
    </div>
  );
}
