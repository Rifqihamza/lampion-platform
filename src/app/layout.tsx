import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/provider/Provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Lampion",
  description: "Universal Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", "font-sans", geist.variable)}
    >
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
