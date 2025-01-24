import type { Metadata } from "next";
import {
  Figtree,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontFamily = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amirul's Portfolio",
  description: "Amirul's Portfolio",
  icons: {
    icon: "/hk.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
