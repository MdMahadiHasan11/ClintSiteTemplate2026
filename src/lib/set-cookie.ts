"use server";

import { cookies } from "next/headers";

export async function SetAccessToken(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    expires: expiresAt,
  });
}

export async function SetRefreshToken(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    expires: expiresAt,
  });
}

export async function SetPermissions(permissions: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set("permissions", permissions, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    expires: expiresAt,
  });
}
