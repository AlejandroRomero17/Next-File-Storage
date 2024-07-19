import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ConvexClientProvider from '../ConvexClientProvider';
import { Header } from "../header";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "../footer";
import { SideNav } from "./side-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <Header />
          <main className="container pt-12 mx-auto">
            <div className="flex gap-8">
              <SideNav />
              <div className="w-full">
                {children}
              </div>
            </div>
          </main>
        </ConvexClientProvider>
          <Footer />
      </body>
    </html>
  );
}
