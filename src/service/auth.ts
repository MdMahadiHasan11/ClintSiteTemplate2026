/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import config from "@/config";
import { decrypt } from "@/lib/session";
import {
  SetAccessToken,
  SetPermissions,
  SetRefreshToken,
} from "@/lib/set-cookie";
import {
  passwordSetSchema,
  PasswordSetValues,
} from "@/schema/change-password.schema";
import { loginSchema, otpSchema } from "@/schema/signin.schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SigninRequestFormValues {
  identifier: string;
  password: string;
}
interface SigninFormValues {
  identifier: string;
  otp: string;
}

interface SignupFormValues {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}

export async function sendLoginRequest(formData: SigninRequestFormValues) {
  const validatedFields = loginSchema.safeParse({
    identifier: formData.identifier,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log({ validatedFields });

  try {
    console.log(config.host, "host");
    const res = await fetch(`${config.host}/api/v1/auth/login/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: formData.identifier,
        password: formData.password,
      }),
      credentials: "include",
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    if (result?.data?.accessToken && result?.data?.refreshToken) {
      const decryptedAccessToken = await decrypt(result?.data?.accessToken);
      const decryptedRefreshToken = await decrypt(result?.data?.refreshToken);

      const accessTokenExpire = new Date(
        (decryptedAccessToken?.exp || 24 * 60 * 60) * 1000
      );
      const refreshTokenExpire = new Date(
        (decryptedRefreshToken?.exp || 365 * 24 * 60 * 60) * 1000
      );

      // Store permissions in cookie instead of Redis
      // if (result?.data?.permissions) {
      //   await SetPermissions(
      //     JSON.stringify(result?.data?.permissions),
      //     accessTokenExpire,
      //   );
      // }
      console.log(result?.data?.accessToken, "new");

      await SetAccessToken(result?.data?.accessToken, accessTokenExpire);
      await SetRefreshToken(result?.data?.accessToken, refreshTokenExpire);
    }

    // Return success response
    return {
      success: result?.success,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function signin(formData: SigninFormValues) {
  const validatedFields = otpSchema.safeParse({
    identifier: formData.identifier,
    otp: formData.otp,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${config.host}/api/v1/auth/login/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: formData.identifier,
        otp: formData.otp,
      }),
      credentials: "include",
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    if (result?.success) {
      const decryptedAccessToken = await decrypt(result?.data?.accessToken);
      const decryptedRefreshToken = await decrypt(result?.data?.refreshToken);

      const accessTokenExpire = new Date(
        (decryptedAccessToken?.exp || 24 * 60 * 60) * 1000
      );
      const refreshTokenExpire = new Date(
        (decryptedRefreshToken?.exp || 365 * 24 * 60 * 60) * 1000
      );

      // Store permissions in cookie instead of Redis
      if (result?.data?.permissions) {
        await SetPermissions(
          JSON.stringify(result?.data?.permissions),
          accessTokenExpire
        );
      }

      await SetAccessToken(result?.data?.accessToken, accessTokenExpire);
      await SetRefreshToken(result?.data?.accessToken, refreshTokenExpire);
    }
    // Return success response
    return {
      success: result?.success,
      data: result.data,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function googleSignIn(code: string) {
  try {
    const res = await fetch(`${config.host}/api/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (result?.success)
      await SetAccessToken(result?.data?.accessToken, expiresAt);

    // Return success response
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // Handle any network or unexpected errors
    return {
      success: false,
      error,
    };
  }
}

export async function ChangePassword(formData: PasswordSetValues) {
  const validatedFields = passwordSetSchema.safeParse({
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword,
    confirmPassword: formData.confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const sessionCookie = (await cookies()).get("session");

    const res = await fetch(`${config.host}/api/v1/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionCookie?.value || ""}`,
      },
      body: JSON.stringify({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }),
      credentials: "include",
    });

    const result = await res.json();
    (await cookies()).delete("is_change_password");

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Password Change failed",
      };
    }
    // Return success response
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function signup(formData: SignupFormValues) {
  const validatedFields = loginSchema.safeParse({
    full_name: formData.full_name,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${config.host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }),
      credentials: "include",
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Signup failed",
      };
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (result?.success)
      await SetAccessToken(result?.data?.accessToken, expiresAt);
    // Return success response
    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      errors: "Something went wrong. Please try again.",
    };
  }
}

export async function signout() {
  const sessionCookie = (await cookies()).get("session");
  const accessTokenCookie = (await cookies()).get("accessToken");

  // Delete permissions cookie during logout
  (await cookies()).delete("permissions");
  fetch(config.host + "/api/v1/auth/logout", {
    headers: {
      Authorization: `Bearer ${sessionCookie?.value}` || "",
    },
    method: "POST",
    cache: "no-store",
  });
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  // (await cookies()).delete("permissions");
  redirect("/auth/signin");
}
