import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Routes that require a logged-in user. The authoritative check still
// happens in the page itself (via lib/dal.ts's verifySession) — this is
// just an optimistic redirect to avoid a render-then-bounce flash.
const protectedRoutes = ["/fan", "/coach"];

function matchesRoute(path: string, route: string) {
  return path === route || path.startsWith(`${route}/`);
}

function redirectWithSessionCookies(
  destination: string,
  request: NextRequest,
  sessionResponse: NextResponse
) {
  const redirectResponse = NextResponse.redirect(
    new URL(destination, request.url)
  );

  sessionResponse.cookies.getAll().forEach((cookie) =>
    redirectResponse.cookies.set(cookie)
  );

  for (const header of ["cache-control", "expires", "pragma"]) {
    const value = sessionResponse.headers.get(header);
    if (value) redirectResponse.headers.set(header, value);
  }

  return redirectResponse;
}

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

  // Verifies the JWT and refreshes an expired token when needed. Never trust
  // getSession() here because it only reads the user-controlled cookie.
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims?.sub);

  const path = request.nextUrl.pathname;

  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => matchesRoute(path, route))
  ) {
    return redirectWithSessionCookies("/login", request, response);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
