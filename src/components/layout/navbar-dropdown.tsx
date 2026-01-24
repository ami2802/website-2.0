import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export default function NavbarDropdown({
  children,
  asChild,
  forceDarkShadow,
  onTabChange,
}: {
  children: ReactNode;
  asChild?: boolean;
  forceDarkShadow?: boolean;
  onTabChange?: (tab: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1"
        asChild={asChild}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={cn(
          forceDarkShadow ? "shadow-xl" : "shadow-slate-200 dark:shadow-black",
        )}
      >
        <DropdownMenuItem onClick={() => onTabChange?.("about")}>
          about
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onTabChange?.("work")}>
          work
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onTabChange?.("projects")}>
          projects
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onTabChange?.("blog")}>
          blog
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-1"
          >
            resume <ArrowUpRight className="w-3 h-3 opacity-50" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
