import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font';
import "./globals.css";
import { Providers } from "../providers/providers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: "Mini-Commerce | Modern E-Commerce Prototype",
  description: "A client-side e-commerce prototype built with Next.js",
  openGraph: {
    title: "Mini-Commerce",
    description: "Modern e-commerce prototype",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Mini-Commerce</h1>
                {/* <ThemeToggle /> */}
                <Link href="/cart" className="relative p-2">
                      <ShoppingCart className="h-5 w-5" />
                  </Link>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}