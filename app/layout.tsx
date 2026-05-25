import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "ArtisanPH - Philippine Artist Marketplace",
  description: "Discover and commission Filipino artists. From digital art to traditional crafts, find your perfect creative collaborator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
