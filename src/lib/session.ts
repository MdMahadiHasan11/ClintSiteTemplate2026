"use server";

import { TSession } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import "server-only";

export interface DecryptedSession {
  userId: string | null;
  userType: "ADMIN" | "DEVELOPER";
  iat: number;
  exp: number;
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) {
      throw new Error("No session token provided");
    }
    const payload = jwtDecode<DecryptedSession>(session);

    if (payload.exp * 1000 < Date.now()) {
      throw new Error("Session token expired");
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<TSession> {
  const cookie = (await cookies()).get("accessToken")?.value;

  if (cookie) {
    const session = await decrypt(cookie);

    if (session?.userId) {
      return {
        isAuth: true,
        user: {
          userId: session.userId,
        },
        user_type: session.userType,
      };
    }
  }

  return { isAuth: false, user: null, user_type: "guest" };
}
