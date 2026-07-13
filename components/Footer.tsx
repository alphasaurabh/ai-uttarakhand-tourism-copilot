import Link from "next/link";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/ai-planner", label: "AI Planner" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/login", label: "Login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-slate-950 text-slate-300 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f766e] text-sm font-semibold text-white shadow-sm shadow-[#0f766e]/20">
                UK
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
                  Uttarakhand Copilot
                </p>
                <h3 className="text-lg font-semibold text-white">
                  AI-powered travel planning
                </h3>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Discover destinations, shape calmer itineraries, and plan Uttarakhand trips with a cleaner, more thoughtful experience.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                {column.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Uttarakhand Tourism Copilot</p>
          <p>Designed for calm, premium travel planning.</p>
        </div>
      </div>
    </footer>
  );
}