/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/provider/session-provider";
import { useResendOtpMutation } from "@/redux/features/auth/authApi";
import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { sendLoginRequest, signin } from "@/service/auth";
import { Lock, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [localLoading, setLocalLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [countdown, setCountdown] = useState(59);
  const [redirect, setRedirect] = useState("/dashboard");
  const [rememberMe, setRememberMe] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const { setIsLoading } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resendOtp] = useResendOtpMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("identifier");
    const redirectParam = params.get("redirect");

    if (urlToken) {
      setUserEmail(urlToken);
      setEmail(urlToken);
      setShowOtpForm(true);
    }
    if (redirectParam) {
      setRedirect(decodeURIComponent(redirectParam));
    }
  }, []);

  useEffect(() => {
    if (showOtpForm && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showOtpForm, countdown]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLocalLoading(true);
    setIsLoading(true);

    try {
      const response: any = await sendLoginRequest({
        identifier: email.trim(),
        password,
      });

      if (response?.success) {
        if (response?.data?.user) {
          dispatch(login(response.data));
          toast.success("Logged In Successfully");
          router.replace(redirect);
        } else {
          setUserEmail(email.trim());
          setShowOtpForm(true);
          router.replace(
            `/auth/signin?identifier=${email.trim()}&redirect=${encodeURIComponent(
              redirect
            )}`
          );
          toast.success("OTP sent to your email");
          setCountdown(59);
        }
      } else {
        toast.error(response?.data?.message || "Failed to send OTP");
      }
    } catch (error: any) {
      const msg =
        error?.data?.details?.[0]?.message ||
        error?.data?.error?.message ||
        "Failed to send OTP";
      toast.error(msg);
    } finally {
      setLocalLoading(false);
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setOtpLoading(true);
    setLocalLoading(true);
    setIsLoading(true);

    try {
      const response = await signin({
        identifier: userEmail,
        otp,
      });

      if (response.success) {
        dispatch(login(response.data));
        toast.success("Logged In Successfully");
        router.replace(redirect);
      } else {
        toast.error(response.message || "OTP verification failed");
      }
    } catch (error: any) {
      const msg =
        error?.data?.details?.[0]?.message ||
        error?.data?.error?.message ||
        "Failed to verify OTP";
      toast.error(msg);
    } finally {
      setLocalLoading(false);
      setOtpLoading(false);
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!userEmail) {
      toast.error("No email found");
      return;
    }

    const response: any = await resendOtp({ token_id: userEmail });

    if (response?.data?.success) {
      setUserEmail(response?.data?.data.token_id);
      setCountdown(59);
      toast.success("OTP resent successfully");
    } else {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold uppercase">
          {showOtpForm ? "Verify OTP" : "Sign in"}
        </CardTitle>
        {showOtpForm && (
          <p className="text-sm text-muted-foreground mt-2">
            Enter the 6-digit OTP sent to{" "}
            <span className="font-medium">{email || userEmail}</span>
          </p>
        )}
      </CardHeader>

      <CardContent>
        {!showOtpForm ? (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Username or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Username or Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              onClick={handleLogin}
              disabled={localLoading}
              className="w-full h-12 text-base"
            >
              {localLoading ? (
                "LOGGING IN..."
              ) : (
                <>
                  <LogIn className="mr-2 size-5" />
                  LOG IN
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>OTP</Label>
              <div className="grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <Input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        const newOtp = otp.split("");
                        newOtp[i] = value;
                        setOtp(newOtp.join(""));

                        if (value && i < 5) {
                          const inputs =
                            document.querySelectorAll('input[type="text"]');
                          (inputs[i + 1] as HTMLInputElement)?.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[i] && i > 0) {
                        const inputs =
                          document.querySelectorAll('input[type="text"]');
                        (inputs[i - 1] as HTMLInputElement)?.focus();
                      }
                    }}
                    className="aspect-square text-center text-lg font-semibold"
                  />
                ))}
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {countdown > 0 ? (
                <span>Resend OTP in {countdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-medium text-primary hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <Button
              onClick={handleOtpVerify}
              disabled={otpLoading || otp.length !== 6}
              className="w-full h-12 text-base"
            >
              {otpLoading ? (
                "VERIFYING..."
              ) : (
                <>
                  <LogIn className="mr-2 size-5" />
                  VERIFY OTP
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
