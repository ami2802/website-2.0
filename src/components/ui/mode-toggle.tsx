"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname === "/resume") return null;

  if (!mounted) {
    // Return a placeholder with same dimensions to avoid layout shift
    return (
      <button className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 w-10 h-10 cursor-pointer" />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <MdLightMode className="w-6 h-6 text-yellow-500" />
      ) : (
        <MdDarkMode className="w-6 h-6 text-slate-700" />
      )}
    </button>
  );
}
