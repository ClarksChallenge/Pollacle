import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/SessionProvider";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://pollacle.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Pollacle — Support Causes. Make an Impact.",
    template: "%s | Pollacle",
  },

  description:
  "Pollacle is building more reliable ways for people to support creators, nonprofits, schools, sports teams, and community organizations.",

  applicationName: "Pollacle",

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/favicon.svg",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Pollacle",
    title: "Pollacle — Support Causes. Make an Impact.",
    description:
      "Pollacle is building more reliable ways for people to support creators, nonprofits, schools, sports teams, and community organizations.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pollacle — Support Causes. Make an Impact.",
    description:
      "Discover campaigns and find meaningful ways to support the causes that matter.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Pollacle",
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      description:
        "Pollacle is building more reliable ways for people to support creators, nonprofits, schools, sports teams, and community organizations.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Pollacle",
      url: siteUrl,
      description:
        "Pollacle is building reliable ways for people to support fundraisers and communities through meaningful participation and action.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
 
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3196995704080676"
          crossOrigin="anonymous"
       />

     </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
       <AuthProvider>
         {children}
         <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
