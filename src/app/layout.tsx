import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RestoBot Generator",
  description: "Create your custom bot that answers any question about your restaurant or bar's menu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundImage: "url(/img/bg.webp)" }}>
        <div className="bg-black/50 h-screen" >
          {children}
        </div>
      </body>
    </html>
  );
}
