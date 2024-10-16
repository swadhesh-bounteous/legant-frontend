import type { Metadata } from "next";
import "./globals.css";
import NextQueryProvider from "@/components/nextqueryprovider/NextQueryProvider";

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
      <body className={`font-Poppins antialiased`}>
        <NextQueryProvider>{children}</NextQueryProvider>
      </body>
    </html>
  );
}
