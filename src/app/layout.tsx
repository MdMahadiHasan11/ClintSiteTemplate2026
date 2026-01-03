import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/provider/redux-provider";
import { SessionProvider } from "@/provider/session-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flyghor | Books Flights, Hotels and more...",
  description:
    "Book Flights, Hotels, and More with Flyghor - Your Ultimate Travel Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
