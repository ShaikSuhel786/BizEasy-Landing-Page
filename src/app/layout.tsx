import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Outfit } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"]
});

export const metadata: Metadata = {
  // Checklist K1: Descriptive title + meta description
  title: "BizEasy — Never Lose a WhatsApp Order Again",
  description:
    "BizEasy automates WhatsApp & Instagram orders for Indian sellers. Instant UPI payments, GST invoicing, and a smart catalogue — all inside the chat your customers already use.",
  // Checklist K2: Link-preview card for WhatsApp, Instagram, Twitter shares
  openGraph: {
    title: "BizEasy — Never Lose a WhatsApp Order Again",
    description:
      "Automate your WhatsApp shop. Catalogue, orders, UPI payments, and GST invoicing — in one tap.",
    url: "https://bizeasy.in",
    siteName: "BizEasy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizEasy — Never Lose a WhatsApp Order Again",
    description:
      "Automate your WhatsApp shop. Catalogue, orders, UPI payments, and GST invoicing — in one tap.",
  },
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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

