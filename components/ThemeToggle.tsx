"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#0f766e]/20 hover:bg-white hover:shadow-[var(--shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-[#2dd4bf]/20 dark:hover:bg-slate-900"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span
        className={`absolute inset-0 m-auto h-4.5 w-4.5 transition-all duration-200 ease-out ${isDark ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
        </svg>
      </span>

      <span
        className={`absolute inset-0 m-auto h-4.5 w-4.5 transition-all duration-200 ease-out ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.7A8.5 8.5 0 1 1 11.3 3a7.2 7.2 0 0 0 9.7 9.7Z" />
        </svg>
      </span>
    </button>
  );
}