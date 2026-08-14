"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai-planner", label: "AI Planner" },
];

const tokenChangedEvent = "auth-token-changed";

function NavLink({ href, label, pathname, onClick }: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}) {
  const isActive = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-full px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? "bg-[#0f766e] text-white shadow-sm shadow-[#0f766e]/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"}`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const updateAuthenticationState = () => {
      setIsAuthenticated(Boolean(window.localStorage.getItem("token")));
    };

    const supabase = createClient();
    const syncSessionToken = (accessToken?: string) => {
      if (accessToken) {
        window.localStorage.setItem("token", accessToken);
      } else {
        window.localStorage.removeItem("token");
      }
      updateAuthenticationState();
    };

    updateAuthenticationState();
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session?.access_token) {
        syncSessionToken(data.session.access_token);
      }
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      syncSessionToken(session?.access_token);
    });
    window.addEventListener("storage", updateAuthenticationState);
    window.addEventListener(tokenChangedEvent, updateAuthenticationState);

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener("storage", updateAuthenticationState);
      window.removeEventListener(tokenChangedEvent, updateAuthenticationState);
    };
  }, []);

  const handleSignOut = async () => {
    window.localStorage.removeItem("token");
    window.dispatchEvent(new Event(tokenChangedEvent));

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Unable to sign out", error);
    }

    router.replace("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f766e] text-sm font-semibold text-white shadow-sm shadow-[#0f766e]/20">
            UK
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f766e] dark:text-[#2dd4bf]">
              Uttarakhand
            </span>
            <span className="text-sm font-semibold text-slate-950 dark:text-white">
              Copilot
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-black/5 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                pathname={pathname}
              />
            ))}
          </div>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Sign out
            </button>
          ) : (
            <NavLink href="/login" label="Login" pathname={pathname} />
          )}

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className="h-0.5 w-4 rounded-full bg-current" />
              <span className="h-0.5 w-4 rounded-full bg-current" />
              <span className="h-0.5 w-4 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${mobileOpen ? "block" : "hidden"} border-t border-black/5 px-4 py-3 dark:border-white/10 md:hidden`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 rounded-3xl border border-black/5 bg-surface/90 p-2 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />
          ))}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleSignOut();
              }}
              className="rounded-full px-3.5 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Sign out
            </button>
          ) : (
            <NavLink
              href="/login"
              label="Login"
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
