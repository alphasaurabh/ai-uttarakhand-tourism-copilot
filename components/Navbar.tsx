import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          Uttarakhand Copilot
        </h1>
        <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400"></h1>
        <div className="flex flex-wrap items-center gap-6 mt-3 md:mt-0 text-gray-700 dark:text-gray-200 font-medium"></div>
        <div className="flex flex-wrap items-center gap-6 mt-3 md:mt-0 text-gray-700 dark:text-gray-200 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
          <Link href="/ai-planner">AI Planner</Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}