export interface FooterUserInfoProps {
  userName: string;
  plan: string;
  isSidebarOpen: boolean;
}

export function FooterUserInfo({
  userName,
  plan,
  isSidebarOpen,
}: FooterUserInfoProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 shrink-0">
      <div
        className={`flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full cursor-default bg-black/75 group-hover:shadow-xl ${isSidebarOpen ? "" : "-translate-x-1.25"}`}
      >
        <span className="font-bold text-white">{initials}</span>
      </div>
      {isSidebarOpen && (
        <div className="flex flex-col py-1 shrink-0">
          <span className="font-bold transition-all duration-300 text-md text-text-primary/80 group-hover:text-text-primary">
            {userName}
          </span>
          <span className="text-xs">{plan}</span>
        </div>
      )}
    </div>
  );
}
