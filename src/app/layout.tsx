"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";
import { usePathname } from "next/navigation";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"], // Add more weights if needed
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");

  return (
    <html lang="en" className={robotoCondensed.className}>
      <body>{isAuthPage ? children : <Layout>{children}</Layout>}</body>
    </html>
  );
}
