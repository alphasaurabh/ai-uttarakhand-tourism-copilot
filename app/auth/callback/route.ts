import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!next.startsWith("/")) {
    return NextResponse.redirect(`${origin}/login?error=invalid_next`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const redirectOrigin =
        process.env.NODE_ENV === "development"
          ? origin
          : forwardedHost
            ? `https://${forwardedHost}`
            : origin;

      return NextResponse.redirect(`${redirectOrigin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth_callback`);
}
