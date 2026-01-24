import React from "react";
import NavbarDropdown from "./navbar-dropdown";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function Navbar({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const animation = "transition ease-in-out hover:scale-110";
  return (
    <div className="fixed top-0 z-40 w-full flex md:justify-center justify-start items-center py-4 px-4 bg-white dark:bg-slate-950 shadow-sm">
      <NavbarDropdown onTabChange={onTabChange} asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="flex md:hidden hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <Menu className="text-slate-700 dark:text-slate-300" />
        </Button>
      </NavbarDropdown>
    </div>
  );
}
