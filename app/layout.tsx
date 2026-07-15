import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Schibsted_Grotesk,
  Montserrat,
  Playfair_Display,
  Cause,
  Roboto_Condensed,
  Supermercado_One,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Scroller from "@/components/scroller";
import NavBar from "@/components/navBar";

const schibsted_grotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const roboto_condensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  display: "swap",
});

const cause = Cause({
  variable: "--font-cause",
  subsets: ["latin"],
  display: "swap",
});

const playfair_display = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const supermercado_one = Supermercado_One({
  variable: "--font-supermercado-one",
  display: "swap",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discover Games",
  description: "Discover and look up new and trending games",
  metadataBase: new URL('https://keakstein.vercel.app'),
  openGraph: {
    title: "Discover new and trending Games",
    description: "Discover and look up new and trending games",
    type: "website",
    siteName: "Keakstein",
    images: [
      {
        url: "/page-for-meta.png",
        width: 1600,
        height: 900,
        alt: "Find your favourite games and more"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Keakstein - GameGrid",
    description: "Discover and look up new and trending games",
    images: ["/page-for-meta.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${supermercado_one.variable} ${roboto_condensed.variable} ${cause.variable} ${geistMono.variable} ${playfair_display.variable} ${montserrat.variable}  ${inter.variable} ${schibsted_grotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico"/>
        <link rel="icon" href="/faviconsvg.svg"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
        <link rel="manifest" href="/keakstein.webmanifest.json"/>
        <meta name="theme-color" content="ffffff"/>
      </head>
      <body className="min-h-full flex flex-col">
        <Providers >
          <Scroller>
            <NavBar/>
              {children}
          </Scroller>
        </Providers>
      </body>
    </html>
  );
}
