import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "LikhaPinas - The Digital Home of Filipino Creativity",
  description: "An immersive Filipino creative ecosystem with marketplace, live streams, galleries, social discovery, and AI creator tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        {children}
      </body>
    </html>
  );
}
