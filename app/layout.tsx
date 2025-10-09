import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game of Life",
  description:
    "This is a web application built with Next.js that simulates John Conway's Game of Life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
