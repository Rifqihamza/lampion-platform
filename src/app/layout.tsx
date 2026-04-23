import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/provider/Provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import AnimateBackground from "@/components/animation/AnimateBackground";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Lampion Platform - Universal Learning Platform",
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
      className={cn("antialiased font-sans", geist.variable)}
      suppressHydrationWarning // Wajib di sini
    >
      <body className="min-h-screen bg-background">
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AnimateBackground />

            {children}

            {/* Toaster diletakkan di akhir body */}
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}