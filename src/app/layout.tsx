import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"]
});

export const metadata: Metadata = {
  title: "BizEasy",
  description: "Never lose a WhatsApp order again",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
