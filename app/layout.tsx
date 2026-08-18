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
    default: "Pollacle — Turn Completed Surveys Into Support",
    template: "%s | Pollacle",
  },

  description:
  "Pollacle is a fundraising platform that turns survey completion into support for organizations, communities, and causes people care about.",

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
    title: "Pollacle — Turn Completed Surveys Into Support",
    description:
      "Pollacle is a fundraising platform that turns survey completion into support for organizations, communities, and causes people care about.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pollacle — Turn Completed Surveys Into Support",
    description:
      "Support fundraisers by completing surveys and help turn your completed surveys into real support for causes that matter.",
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
        "Pollacle is a fundraising platform that turns survey completion into support for organizations, communities, and causes people care about.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Pollacle",
      url: siteUrl,
      description:
        "Pollacle helps people support fundraisers by completing qualifying surveys.",
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
