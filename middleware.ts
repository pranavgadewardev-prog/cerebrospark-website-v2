// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();

//   const supabase = createMiddlewareClient({ req, res });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const { data: userData } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", session.user.id)
//     .single();

//   const pathname = req.nextUrl.pathname;

//   if (pathname.startsWith("/admin") && userData?.role !== "admin") {
//     return NextResponse.redirect(new URL("/user/dashboard", req.url));
//   }

//   if (pathname.startsWith("/user") && userData?.role !== "user") {
//     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//   }

//   return res;
// }

// // ✅ PLACE THIS AT BOTTOM OF SAME FILE
// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // ✅ Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Get role
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();

  const pathname = req.nextUrl.pathname;

  // 🔒 Admin protection
  if (pathname.startsWith("/admin") && userData?.role !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  // 🔒 User protection
  if (pathname.startsWith("/user") && userData?.role !== "user") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return res;
}

// ✅ matcher stays SAME
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};