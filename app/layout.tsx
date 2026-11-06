import type { Metadata } from "next";
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
  "Pollacle is a pre-launch fundraising platform for creators, schools, nonprofits, and sports teams.",

  applicationName: "Pollacle",

  alternates: {
    canonical: "./",
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
    siteName: "Pollacle",
    images: [{ url: "/pollacle.png", alt: "Pollacle purple octopus mascot" }],
    title: "Pollacle — Support Causes. Make an Impact.",
    description:
      "Pollacle is a pre-launch fundraising platform for creators, schools, nonprofits, and sports teams.",
  },

  twitter: {
    card: "summary_large_image",
    images: ["/pollacle.png"],
    title: "Pollacle — Support Causes. Make an Impact.",
    description:
      "Pollacle is a pre-launch fundraising platform for creators, schools, nonprofits, and sports teams.",
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
        "Pollacle is a pre-launch fundraising platform for creators, schools, nonprofits, and sports teams.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Pollacle",
      url: siteUrl,
      description:
        "Pollacle helps people support creators, schools, nonprofits, and sports teams.",
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
