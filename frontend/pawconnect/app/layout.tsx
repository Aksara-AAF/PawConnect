import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawConnect | Adopsi & Donasi Hewan Peliharaan",
  description: "Platform adopsi dan donasi hewan peliharaan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex flex-col h-screen overflow-hidden bg-slate-50`}>

        <div className="flex-none z-50 bg-white">
          <Navbar />
        </div>

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