import type { Metadata } from "next";
import "./globals.css";
import NextQueryProvider from "@/components/nextqueryprovider/NextQueryProvider";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
        <link rel="preload" href="/assets/images/shop_bg.jpg" as="image" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <NextQueryProvider>
          {children}
        </NextQueryProvider>
      </body>
    </html>
  );
}
