import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Amirul Azizol",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Amirul Azizol",
    url: "https://amirul.dev",
    siteName: "amirul.dev",
    images: [
      {
        url: "/me.png",
        width: 1374,
        height: 1832,
        alt: "Amirul Azizol",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Amirul Azizol",
    images: ["/me.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSerif.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
