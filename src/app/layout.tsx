import type { Metadata } from "next";
import "./globals.css";
import NextQueryProvider from "@/components/nextqueryprovider/NextQueryProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "3legant",
  description: "App By Swadhesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
          rel="preload"
          href="/assets/images/shop_bg.jpg"
          as="image"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-Poppins antialiased`}>
        <NextQueryProvider>{children}</NextQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
