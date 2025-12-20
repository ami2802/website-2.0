import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontFamily = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "amirul.dev",
  description: "Amrul's Portfolio",
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
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Amirul Azizol" />
        <meta
          property="og:description"
          content="Machine learning engineer."
        />
        <meta property="og:image" content="https://amirul.dev/og-image.png" />
        <meta property="og:url" content="https://amirul.dev" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amirul Azizol" />
        <meta
          name="twitter:description"
          content="Machine learning engineer"
        />
        <meta name="twitter:image" content="https://amirul.dev/og-image.png" />
      </head>
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
