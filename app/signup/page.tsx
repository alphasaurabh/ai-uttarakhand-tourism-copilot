"use client";

import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const captchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function Signup() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, captchaToken }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? data.errors?.[0]?.msg ?? "Unable to create your account.");
        captchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }

      setSuccess("Account created successfully. You can now sign in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                Join the journey
              </span>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Create your account
              </h1>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                Save travel plans and start exploring Uttarakhand your way.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
                <input id="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">Email address</label>
                <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white" />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                <div className="relative">
                  <input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} className="h-12 w-full rounded-2xl border border-border bg-background px-4 pr-12 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white" />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M2.25 12s3.5-6 9.75-6 9.75 6 9.75 6-3.5 6-9.75 6-9.75-6-9.75-6Z" /><circle cx="12" cy="12" r="2.75" /></svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-slate-700 dark:text-slate-200">Confirm Password</label>
                <div className="relative">
                  <input id="confirm-password" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={6} className="h-12 w-full rounded-2xl border border-border bg-background px-4 pr-12 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 dark:text-white" />
                  <button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M2.25 12s3.5-6 9.75-6 9.75 6 9.75 6-3.5 6-9.75 6-9.75-6-9.75-6Z" /><circle cx="12" cy="12" r="2.75" /></svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">CAPTCHA</span>
                {captchaSiteKey ? (
                  <ReCAPTCHA ref={captchaRef} sitekey={captchaSiteKey} onChange={setCaptchaToken} />
                ) : (
                  <p className="text-sm text-red-600 dark:text-red-400">CAPTCHA is not configured. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to continue.</p>
                )}
              </div>

              {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              {success && <p role="status" className="text-sm text-emerald-700 dark:text-emerald-300">{success}</p>}

              <button type="submit" disabled={isSubmitting || !captchaToken} className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </button>

              <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                Already have an account? <Link href="/login" className="font-medium text-emerald-700 transition hover:text-emerald-800 hover:underline dark:text-emerald-300 dark:hover:text-emerald-200">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
