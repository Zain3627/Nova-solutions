import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Routes that should never be visited by an already-logged-in user.
const authOnlyRoutes = ["/login", "/signup"];
// Routes that require a logged-in user. The authoritative check still
// happens in the page itself (via lib/dal.ts's verifySession) — this is
// just an optimistic redirect to avoid a render-then-bounce flash.
const protectedRoutes = ["/fan"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Deliberately calling getUser() (a network round-trip to Supabase Auth)
  // rather than trusting the cookie: this is what silently refreshes an
  // expired access token on every request. It's an intentional exception to
  // the generic "Proxy should stay cookie-only" advice, specific to
  // Supabase's SSR session pattern.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (!user && protectedRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && authOnlyRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
