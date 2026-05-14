import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawConnect | Adopsi & Donasi Hewan",
  description: "Platform peer-to-peer untuk adopsi hewan peliharaan dan donasi shelter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* 
        1. h-screen & overflow-hidden mengunci layar utama.
        Ini memastikan tidak ada "Double Scrollbar" seumur hidup.
      */}
      <body className={`${inter.className} flex flex-col h-screen overflow-hidden bg-slate-50`}>

        <div className="flex-none z-50 bg-white">
          <Navbar />
        </div>

        {/* HAPUS scroll-smooth di sini. Sisakan overflow-y-auto, snap-y, dan snap-mandatory */}
        <main className="flex-1 overflow-y-auto snap-y snap-mandatory relative">
          {children}

          <div className="snap-end">
            <Footer />
          </div>
        </main>

      </body>
    </html>
  );
}