import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "HomeBowl — Homemade Meals, Delivered with Love",
  description:
    "Order authentic homemade African meals from independent home chefs in your community. Fresh, cultural, and made with love.",
  keywords:
    "homemade food, African cuisine, home chefs, food delivery, authentic meals",
  openGraph: {
    title: "HomeBowl — Homemade Meals, Delivered with Love",
    description:
      "Order authentic homemade African meals from independent home chefs in your community. Fresh, cultural, and made with love.",
    url: "https://gethomebowl.com",
    siteName: "HomeBowl",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HomeBowl — Homemade Meals, Delivered with Love",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeBowl — Homemade Meals, Delivered with Love",
    description:
      "Order authentic homemade African meals from independent home chefs in your community. Fresh, cultural, and made with love.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${fraunces.variable} scroll-smooth relative`}
    >
      <body className="relative min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
