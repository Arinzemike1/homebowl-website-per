import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Fraunces,
  Sacramento,
  Caveat,
} from "next/font/google";
import Providers from "@/components/providers/Providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Loaded as a variable font so the posters' heavy, soft serif can be tuned via SOFT/WONK/opsz.
const fraunces = Fraunces({
  variable: "--font-fraunces-var",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const title = "HomeBowl — Good food. Home made.";
const description =
  "HomeBowl is where home chefs create, connect and sell. Discover great home food, follow the chefs behind it, and find your next favourite bowl.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gethomebowl.com"),
  title,
  description,
  keywords:
    "HomeBowl, home chefs, homemade food, Nigerian food, home-cooked meals, food app, jollof, egusi",
  openGraph: {
    title,
    description,
    url: "https://gethomebowl.com",
    siteName: "HomeBowl",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HomeBowl | Good food. Home made.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#26130b",
};

// Runs before paint: skip the intro curtain for repeat visits in the same session.
const introScript = `try{if(sessionStorage.getItem('hb-intro')){document.documentElement.setAttribute('data-intro-seen','')}else{sessionStorage.setItem('hb-intro','1')}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // `relative` gives framer-motion's scroll tracking a positioned container to measure against
      className={`${jakarta.variable} ${fraunces.variable} ${sacramento.variable} ${caveat.variable} relative`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="relative min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
