"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const supabase = createClient();

    const handleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(error.message);
                return;
            }

            router.replace("/dashboard");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    const handleGoogleSignIn = async () => {
        const callbackUrl = new URL("/auth/callback", window.location.origin);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: callbackUrl.toString(),
            },
        });

        if (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl items-center justify-center">
                    <div className="w-full max-w-md rounded-[32px] border border-border bg-surface/90 p-6 shadow-sm shadow-slate-950/5 sm:p-8">
                        <div className="space-y-3 text-center">
                            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900/70 dark:text-emerald-300">
                                Secure sign in
                            </span>

                            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                Welcome back
                            </h1>

                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                                Sign in to continue your journey and access your saved travel plans.
                            </p>
                        </div>

                        <div className="mt-8 space-y-5">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                                />

                                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    Use the email linked to your account.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white"
                                />

                                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    Keep your password private and use a strong combination.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
                                Sign in securely to access your saved trips, recommendations, and itinerary drafts.
                            </div>

                            <button
                                onClick={handleLogin}
                                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm shadow-slate-950/10 transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                            >
                                Sign in
                            </button>

                            <div className="flex items-center gap-4" aria-hidden="true">
                                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    OR
                                </span>
                                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.52h3.14c1.84-1.7 2.91-4.2 2.91-7.29Z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36L15.31 16.9c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.71-5.47-4.02H3.28v2.6A9.75 9.75 0 0 0 12 21.75Z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M6.53 13.8A5.86 5.86 0 0 1 6.22 12c0-.63.11-1.24.31-1.8V7.6H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.4l3.25-2.6Z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 6.18c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.26 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.28 7.6l3.25 2.6C7.3 7.89 9.46 6.18 12 6.18Z"
                                    />
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
