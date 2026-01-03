"use client";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-red-800 dark:text-gray-200">
        Welcome to Flyghor! {user ? `Hello, ${user?.fullName}` : "Guest"}
      </h1>
    </div>
  );
}
