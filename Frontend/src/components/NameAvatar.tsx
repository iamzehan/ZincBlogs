export default function NameAvatar({
  props,
}: {
  props: { profileOpen?: boolean | false; user?:{firstName:string; lastName:string} | null };
}) {
  const { profileOpen, user } = props;
  return (
    <div
      className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-sm
                   ${profileOpen ? "bg-zinc-300 text-black" : "bg-zinc-600"}`}
    >
      {user &&
        (user?.firstName?.charAt(0) + user?.lastName?.charAt(0)).toUpperCase()}
    </div>
  );
}
