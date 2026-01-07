// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { permission } from "./lib/permissions";
// import { routes } from "./lib/routes";
// import { decrypt, DecryptedSession } from "./lib/session";

// const routeMap = new Map<string, { key: string; action: string }>();
// routes.forEach((route) => {
//   routeMap.set(route.path, { key: route.key, action: route.action });
// });

// const sortedRoutes = [...routes].sort((a, b) => b.path.length - a.path.length);

// function getRouteForPath(
//   pathname: string
// ): { key: string; action: string } | null {
//   const exactMatch = routeMap.get(pathname);
//   if (exactMatch) return exactMatch;

//   for (const route of sortedRoutes) {
//     if (pathname.startsWith(route.path + "/")) {
//       return { key: route.key, action: route.action };
//     }
//   }

//   return null;
// }

// function isAccessAllowed(
//   userPermissions: Record<string, string[]> | undefined,
//   pathname: string
// ): boolean {
//   if (!userPermissions) return false;

//   const routeConfig = getRouteForPath(pathname);

//   if (!routeConfig) return true;

//   const { key: permissionKey, action: requiredAction } = routeConfig;

//   const userPermissionActions = userPermissions[permissionKey];

//   if (!userPermissionActions || userPermissionActions.length === 0) {
//     return false;
//   }

//   return userPermissionActions.includes(requiredAction);
// }

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const cookie = req.cookies.get("accessToken")?.value;
//   // const permissionsCookie = req.cookies.get("permissions")?.value;

//   if (pathname === "/") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }
//   let session: DecryptedSession | null = null;

//   if (cookie) {
//     try {
//       session = await decrypt(cookie);
//     } catch (error) {
//       console.log("Token decode error:", error);
//     }
//   }
//   if (!session?.userId) {
//     if (pathname.startsWith("/auth")) {
//       return NextResponse.next();
//     }
//     const loginUrl = new URL(`/auth/signin?redirect=${pathname}`, req.url);
//     const res = NextResponse.redirect(loginUrl);
//     res.cookies.delete("session");
//     return res;
//   }

//   if (session?.userId && pathname.startsWith("/auth")) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // Get permissions from cookie instead of Redis
//   // let permissions = null;
//   // if (permissionsCookie) {
//   //   try {
//   //     permissions = JSON.parse(decodeURIComponent(permissionsCookie));
//   //   } catch (error) {
//   //     console.log("Error parsing permissions from cookie:", error);
//   //   }
//   // }

//   if (!isAccessAllowed(permission, pathname)) {
//     return NextResponse.redirect(new URL("/403", req.url)); // Forbidden page
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
// };
