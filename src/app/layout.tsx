import type { Metadata } from "next";
import "./globals.css";

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
      <body
       className={`font-Poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
